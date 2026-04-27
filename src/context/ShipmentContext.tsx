import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { BACKEND_API_URL, BACKEND_API_KEY } from '@/lib/constants';

export interface Checkpoint {
  id: number;
  name: string;
  location: string;
  status: 'VERIFIED' | 'ANOMALY' | 'PENDING';
  time: string;
  volume: string;
  variance: string;
}

export interface Shipment {
  id: string;
  productType: string;
  volume: string;
  price: string;
  station: string;
  driver: string;
  status: 'ON_ROUTE' | 'ALERT' | 'DELIVERED' | 'DISPATCHED';
  progress: number;
  eta: string;
  checkpoints: Checkpoint[];
}

interface ShipmentContextType {
  shipments: Shipment[];
  selectedShipment: Shipment | null;
  loading: boolean;
  addShipment: (shipment: Omit<Shipment, 'id' | 'status' | 'progress' | 'eta' | 'checkpoints'>) => void;
  selectShipment: (id: string) => void;
  refreshShipments: () => Promise<void>;
}

const ShipmentContext = createContext<ShipmentContextType | undefined>(undefined);

export function ShipmentProvider({ children }: { children: ReactNode }) {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchShipments = useCallback(async () => {
    setLoading(true);
    const loadingToast = setTimeout(() => {
      if (loading) toast.loading("Waking up secure data node... (Render Free Tier)", { id: 'api-wait' });
    }, 2000);

    try {
      const response = await fetch(`${BACKEND_API_URL}/api/shipments`, {
        headers: { 'x-api-key': BACKEND_API_KEY }
      });
      const data = await response.json();
      clearTimeout(loadingToast);
      toast.dismiss('api-wait');
      
      const formattedShipments: Shipment[] = data.map((s: any) => ({
        id: s.manifest_id,
        productType: s.product_type,
        volume: s.volume.toString(),
        price: s.price.toString(),
        station: s.station_address,
        driver: s.driver_address,
        status: s.status === 'DISPATCHED' ? 'ON_ROUTE' : s.status,
        progress: Math.floor(Math.random() * 100), // Mock progress for now as it's not in DB
        eta: 'In Transit',
        checkpoints: [] // We'll fetch these when a shipment is selected
      }));

      setShipments(formattedShipments);
      if (formattedShipments.length > 0 && !selectedShipment) {
        setSelectedShipment(formattedShipments[0]);
      }
    } catch (error) {
      console.error("Failed to fetch shipments:", error);
      toast.error("Data node connection timeout", { id: 'api-wait' });
    } finally {
      setLoading(false);
      clearTimeout(loadingToast);
    }
  }, [selectedShipment, loading]);

  useEffect(() => {
    fetchShipments();
  }, []);

  const selectShipment = async (id: string) => {
    const found = shipments.find(s => s.id === id);
    if (found) {
      // Fetch checkpoints for this shipment
      try {
        const response = await fetch(`${BACKEND_API_URL}/api/checkpoints?shipmentId=${id}`, {
          headers: { 'x-api-key': BACKEND_API_KEY }
        });
        const checkpointData = await response.json();
        const formattedCheckpoints: Checkpoint[] = checkpointData.map((cp: any) => ({
          id: cp.id,
          name: cp.name,
          location: cp.location,
          status: cp.status,
          time: new Date(cp.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          volume: cp.volume_recorded ? `${cp.volume_recorded} L` : '---',
          variance: cp.variance ? `${cp.variance}%` : '---'
        }));

        const updatedShipment = { ...found, checkpoints: formattedCheckpoints };
        setSelectedShipment(updatedShipment);
      } catch (error) {
        console.error("Failed to fetch checkpoints:", error);
        setSelectedShipment(found);
      }
    }
  };

  const addShipment = (data: Omit<Shipment, 'id' | 'status' | 'progress' | 'eta' | 'checkpoints'>) => {
    // Just refresh after a short delay to allow backend to process
    setTimeout(fetchShipments, 1500);
  };

  return (
    <ShipmentContext.Provider value={{ 
      shipments, 
      selectedShipment, 
      loading, 
      addShipment, 
      selectShipment,
      refreshShipments: fetchShipments 
    }}>
      {children}
    </ShipmentContext.Provider>
  );
}

export function useShipments() {
  const context = useContext(ShipmentContext);
  if (context === undefined) {
    throw new Error('useShipments must be used within a ShipmentProvider');
  }
  return context;
}
