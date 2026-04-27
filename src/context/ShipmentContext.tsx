import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  status: 'ON_ROUTE' | 'ALERT' | 'DELIVERED';
  progress: number;
  eta: string;
  checkpoints: Checkpoint[];
}

interface ShipmentContextType {
  shipments: Shipment[];
  selectedShipment: Shipment | null;
  addShipment: (shipment: Omit<Shipment, 'id' | 'status' | 'progress' | 'eta' | 'checkpoints'>) => void;
  selectShipment: (id: string) => void;
}

const ShipmentContext = createContext<ShipmentContextType | undefined>(undefined);

const MOCK_CHECKPOINTS: Checkpoint[] = [
  { id: 1, name: 'APAPA DEPOT', location: 'Lagos', status: 'VERIFIED', time: '08:30 AM', volume: '30,938 L', variance: '0.0%' },
  { id: 2, name: 'SAGAMU INTERCHANGE', location: 'Ogun', status: 'VERIFIED', time: '10:15 AM', volume: '30,935 L', variance: '-0.01%' },
  { id: 3, name: 'ORE JUNCTION', location: 'Ondo', status: 'VERIFIED', time: '12:45 PM', volume: '30,930 L', variance: '-0.02%' },
  { id: 4, name: 'BENIN CITY GATE', location: 'Edo', status: 'ANOMALY', time: '14:20 PM', volume: '28,091 L', variance: '-8.6%' },
  { id: 5, name: 'WARRI TERMINAL', location: 'Delta', status: 'PENDING', time: 'ETA 16:30 PM', volume: '---', variance: '---' },
];

const INITIAL_SHIPMENTS: Shipment[] = [
  {
    id: 'SHP-2847',
    productType: 'PMS',
    volume: '30938',
    price: '1.0',
    station: '0xStation...A4',
    driver: 'Emeka Okafor',
    status: 'ALERT',
    progress: 60,
    eta: '16:30',
    checkpoints: MOCK_CHECKPOINTS
  },
  {
    id: 'SHP-2851',
    productType: 'AGO',
    volume: '45000',
    price: '1.2',
    station: '0xStation...B2',
    driver: 'Chidi Nwosu',
    status: 'ON_ROUTE',
    progress: 38,
    eta: '19:15',
    checkpoints: MOCK_CHECKPOINTS.map(cp => ({ ...cp, status: cp.id < 3 ? 'VERIFIED' : 'PENDING' }))
  }
];

export function ShipmentProvider({ children }: { children: ReactNode }) {
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(INITIAL_SHIPMENTS[0]);

  const addShipment = (data: Omit<Shipment, 'id' | 'status' | 'progress' | 'eta' | 'checkpoints'>) => {
    const newId = `SHP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newShipment: Shipment = {
      ...data,
      id: newId,
      status: 'ON_ROUTE',
      progress: 5,
      eta: 'Tomorrow',
      checkpoints: MOCK_CHECKPOINTS.map(cp => ({ ...cp, status: cp.id === 1 ? 'VERIFIED' : 'PENDING' }))
    };
    setShipments([newShipment, ...shipments]);
    setSelectedShipment(newShipment);
  };

  const selectShipment = (id: string) => {
    const found = shipments.find(s => s.id === id);
    if (found) setSelectedShipment(found);
  };

  return (
    <ShipmentContext.Provider value={{ shipments, selectedShipment, addShipment, selectShipment }}>
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
