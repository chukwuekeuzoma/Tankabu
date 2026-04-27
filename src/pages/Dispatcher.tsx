import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fuel, MapPin, Crosshair, User, ShieldCheck, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { useShipments } from '@/context/ShipmentContext';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';
import { 
  FUEL_DISTRIBUTION_ADDRESS, 
  MOCK_STABLECOIN_ADDRESS, 
  FUEL_DISTRIBUTION_V2_ABI, 
  ERC20_ABI,
  BACKEND_API_URL,
  BACKEND_API_KEY
} from '@/lib/constants';

const PRODUCT_TYPES = [
  { id: 'PMS', name: 'PREMIUM MOTOR SPIRIT (PMS)' },
  { id: 'AGO', name: 'AUTOMOTIVE GAS OIL (AGO)' },
  { id: 'DPK', name: 'DUAL PURPOSE KEROSENE (DPK)' },
];

const PREDEFINED_ROUTES = [
  { id: 'custom', name: 'CUSTOM / DIRECT ROUTE', stops: [] },
  { id: 'lg-ib', name: 'LAGOS - IBADAN EXPRESSWAY', stops: ['Berger Exit', 'Shagamu Interchange', 'Ogere Milestone', 'Ibadan Terminal'] },
  { id: 'ben-asb', name: 'BENIN - ASABA CORRIDOR', stops: ['Uselu Marker', 'Agbor Junction', 'Isele-Uku Stop', 'Ubulu-Okiti', 'Asaba Gate'] },
  { id: 'abj-kd', name: 'ABUJA - KADUNA LINK', stops: ['Zuba Junction', 'Suleja Exit', 'Dikko Milestone', 'Tafa Station', 'Jere Stop', 'Kaduna South'] },
  { id: 'ph-ow', name: 'PH - OWERRI CORRIDOR', stops: ['Eleme Junction', 'Obigbo Milestone', 'Umuapu Station', 'Owerri Control'] },
  { id: 'kn-zr', name: 'KANO - ZARIA ROUTE', stops: ['Naibawa Exit', 'Kura Junction', 'Chiromawa Stop', 'Makarfi Stop', 'Zaria Central'] },
  { id: 'en-on', name: 'ENUGU - ONITSHA WAY', stops: ['9th Mile Corner', 'Udi Junction', 'Oji River Stop', 'Ugwuoba Marker', 'Awka Terminal', 'Abagana Gate', 'Onitsha Head-Bridge'] },
  { id: 'ak-ad', name: 'AKURE - ADO EKITI', stops: ['Ilesha Road', 'Owo Junction', 'Ikere Stop', 'Ado Central'] },
  { id: 'js-bc', name: 'JOS - BAUCHI LINK', stops: ['Dogon Karfe', 'Bukuru Exit', 'Kuru Junction', 'Heipang Stop', 'Toro Station', 'Bauchi Gate'] },
  { id: 'cl-uy', name: 'CALABAR - UYO ROUTE', stops: ['Odukpani Junction', 'Okurikang Stop', 'Itu Bridge', 'Uruan Station', 'Uyo Circus'] },
  { id: 'il-lk', name: 'ILORIN - LOKOJA WAY', stops: ['Omu-Aran Exit', 'Egbe Milestone', 'Isanlu Stop', 'Mopa Junction', 'Amuro Gate', 'Kabba Junction', 'Obajana Stop', 'Lokoja Terminal'] },
];

export function Dispatcher() {
  const navigate = useNavigate();
  const { account } = useWallet();
  const { addShipment } = useShipments();
  const [loading, setLoading] = useState(false);
  const [fetchingRate, setFetchingRate] = useState(false);
  const [productType, setProductType] = useState('PMS');
  const [volume, setVolume] = useState('');
  const [pricePerLiter, setPricePerLiter] = useState('0.00');
  const [station, setStation] = useState('');
  const [routeId, setRouteId] = useState('custom');
  const [driver, setDriver] = useState('');

  // Fetch rate from contract
  useEffect(() => {
    const fetchRate = async () => {
      if (!(window as any).ethereum) return;
      setFetchingRate(true);
      try {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const fuelFlow = new ethers.Contract(FUEL_DISTRIBUTION_ADDRESS, FUEL_DISTRIBUTION_V2_ABI, provider);
        const productTypeBytes = ethers.id(productType);
        const rate = await fuelFlow.productRates(productTypeBytes);
        setPricePerLiter(ethers.formatUnits(rate, 18));
      } catch (err) {
        console.error("Failed to fetch rate:", err);
      } finally {
        setFetchingRate(false);
      }
    };
    fetchRate();
  }, [productType]);

  const handleAuthorize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(window as any).ethereum) return alert("Please install MetaMask.");

    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      
      const fuelFlow = new ethers.Contract(FUEL_DISTRIBUTION_ADDRESS, FUEL_DISTRIBUTION_V2_ABI, signer);
      const stablecoin = new ethers.Contract(MOCK_STABLECOIN_ADDRESS, ERC20_ABI, signer);

      const volumeNum = BigInt(volume);
      const priceWei = ethers.parseUnits(pricePerLiter, 18);
      const totalPayment = volumeNum * priceWei;

      // Approval
      toast.loading("Approving USDC payment...", { id: 'dispatch' });
      const approveTx = await stablecoin.approve(FUEL_DISTRIBUTION_ADDRESS, totalPayment);
      await approveTx.wait();

      // Create Manifest (V2 Signature)
      toast.loading("Initializing Dispatch Protocol...", { id: 'dispatch' });
      const productTypeBytes = ethers.id(productType);
      const createTx = await fuelFlow.createManifest(
        productTypeBytes,
        volumeNum,
        driver,
        station,
        await signer.getAddress()
      );
      
      const receipt = await createTx.wait();
      
      // Get manifest ID from logs
      let manifestId = `SHP-${Math.floor(1000 + Math.random() * 9000)}`;
      if (receipt && receipt.logs) {
        const eventFragment = fuelFlow.interface.getEvent("ManifestCreated");
        if (eventFragment) {
          const log = receipt.logs.find(l => l.address.toLowerCase() === FUEL_DISTRIBUTION_ADDRESS.toLowerCase());
          if (log) {
            const decoded = fuelFlow.interface.decodeEventLog(eventFragment, log.data, log.topics);
            manifestId = decoded[0].toString();
          }
        }
      }

      // Hybrid Save to SQL
      try {
        const selectedRoute = PREDEFINED_ROUTES.find(r => r.id === routeId);
        await fetch(`${BACKEND_API_URL}/api/shipments`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-api-key': BACKEND_API_KEY
          },
          body: JSON.stringify({
            manifest_id: manifestId,
            product_type: productType,
            volume: parseFloat(volume),
            price: parseFloat(pricePerLiter),
            station_address: station,
            driver_address: driver,
            planned_route: selectedRoute?.stops || [] // Send the planned stops
          })
        });
      } catch (sqlError) {
        console.error("Hybrid SQL Save Failed:", sqlError);
      }

      addShipment({
        productType,
        volume,
        price: pricePerLiter,
        station,
        driver
      });
      
      toast.success("Dispatch Protocol Executed Successfully!", { id: 'dispatch' });
      setLoading(false);
      navigate('/dashboard');
    } catch (error: any) {
      console.error(error);
      toast.error(`Protocol Failed: ${error.reason || error.message}`, { id: 'dispatch' });
      setLoading(false);
    }
  };

  const truncate = (addr: string) => addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : 'NOT_CONNECTED';

  return (
    <div className="dash-cols">
      <div className="fleet-card" style={{ gridColumn: 'span 12', padding: '32px' }}>
        <div className="fleet-hd" style={{ borderBottom: '1px solid var(--br)', paddingBottom: '20px', marginBottom: '32px' }}>
          <div className="flex items-center gap-3">
            <div style={{ background: 'var(--blue)', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Crosshair className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="fleet-title" style={{ fontSize: '18px', display: 'block' }}>Dispatch Central</span>
              <span className="sn-txt" style={{ fontSize: '9px', opacity: 0.6 }}>PROTOCOL_V2.4.0 // ON_CHAIN_RATES</span>
            </div>
          </div>
          <span className="badge-custom b-route">OPERATOR_ID: {truncate(account || '')}</span>
        </div>

        <form onSubmit={handleAuthorize} className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10">
            {/* Column 1: Cargo Configuration */}
            <div className="space-y-8">
              <div style={{ borderLeft: '2px solid var(--blue)', paddingLeft: '16px' }}>
                <span className="sn-txt" style={{ color: 'var(--blue)', marginBottom: '8px', display: 'block' }}>01. CARGO CONFIGURATION</span>
              </div>

              <div className="ic-group">
                <label className="ic-lbl flex items-center gap-2 mb-2">
                  <Fuel className="w-3.5 h-3.5 text-blue-500" /> PRODUCT_TYPE
                </label>
                <div style={{ position: 'relative' }}>
                  <select 
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    style={{ 
                      width: '100%',
                      background: 'var(--bg3)',
                      border: '1px solid var(--br)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: 'var(--tx1)',
                      fontSize: '13px',
                      fontWeight: 600,
                      appearance: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {PRODUCT_TYPES.map(p => (
                      <option key={p.id} value={p.id} style={{ background: 'var(--bg2)' }}>{p.name}</option>
                    ))}
                  </select>
                  <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.5 }}>
                    ▼
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="ic-group">
                  <label className="ic-lbl mb-2">VOLUME (LITERS)</label>
                  <Input 
                    type="number" 
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    placeholder="0.00"
                    style={{ height: '42px', background: 'var(--bg3)', border: '1px solid var(--br)', fontSize: '13px', fontWeight: 600 }}
                    required
                  />
                </div>
                <div className="ic-group">
                  <label className="ic-lbl mb-2">CONTRACT_RATE (USDC)</label>
                  <div className="relative">
                    <Input 
                      value={fetchingRate ? "Loading..." : `${pricePerLiter} USDC/L`}
                      readOnly
                      style={{ height: '42px', background: 'var(--bg2)', border: '1px dashed var(--br)', fontSize: '13px', fontWeight: 700, color: 'var(--blue)', cursor: 'not-allowed' }}
                    />
                    {fetchingRate && <Loader2 className="absolute right-3 top-3 w-4 h-4 animate-spin text-blue-500" />}
                  </div>
                </div>
              </div>

              {/* Total Calculation Display */}
              <div style={{ 
                background: 'rgba(59, 123, 246, 0.03)', 
                border: '1px solid rgba(59, 123, 246, 0.1)', 
                borderRadius: '12px', 
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--tx3)', display: 'block', marginBottom: '4px', letterSpacing: '0.05em' }}>TOTAL_ESTIMATED_ESCROW</span>
                  <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--tx1)', letterSpacing: '-0.02em' }}>
                    {fetchingRate ? '---' : `${((parseFloat(volume) || 0) * parseFloat(pricePerLiter)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDC`}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '10px', color: 'var(--tx3)', display: 'block' }}>FEE_ESTIMATE</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--green)' }}>0.00% FREE</span>
                </div>
              </div>
            </div>

            {/* Column 2: Logistics & Routing */}
            <div className="space-y-8">
              <div style={{ borderLeft: '2px solid var(--blue)', paddingLeft: '16px' }}>
                <span className="sn-txt" style={{ color: 'var(--blue)', marginBottom: '8px', display: 'block' }}>02. LOGISTICS & ROUTING</span>
              </div>

              <div className="ic-group">
                <label className="ic-lbl flex items-center gap-2 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" /> DESTINATION_STATION
                </label>
                <Input 
                  value={station}
                  onChange={(e) => setStation(e.target.value)}
                  placeholder="0x..."
                  style={{ height: '42px', background: 'var(--bg3)', border: '1px solid var(--br)', fontSize: '13px', fontWeight: 600, fontFamily: 'var(--mono)' }}
                  required
                />
              </div>

              <div className="ic-group">
                <label className="ic-lbl flex items-center gap-2 mb-2">
                  <Crosshair className="w-3.5 h-3.5 text-blue-500" /> ROUTE_PLAN
                </label>
                <div style={{ position: 'relative' }}>
                  <select 
                    value={routeId}
                    onChange={(e) => setRouteId(e.target.value)}
                    style={{ 
                      width: '100%',
                      background: 'var(--bg3)',
                      border: '1px solid var(--br)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: 'var(--tx1)',
                      fontSize: '13px',
                      fontWeight: 600,
                      appearance: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {PREDEFINED_ROUTES.map(r => (
                      <option key={r.id} value={r.id} style={{ background: 'var(--bg2)' }}>{r.name}</option>
                    ))}
                  </select>
                  <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.5 }}>
                    ▼
                  </div>
                </div>
              </div>

              <div className="ic-group">
                <label className="ic-lbl flex items-center gap-2 mb-2">
                  <User className="w-3.5 h-3.5 text-blue-500" /> AUTHORIZED_DRIVER
                </label>
                <Input 
                  value={driver}
                  onChange={(e) => setDriver(e.target.value)}
                  placeholder="0x..."
                  style={{ height: '42px', background: 'var(--bg3)', border: '1px solid var(--br)', fontSize: '13px', fontWeight: 600, fontFamily: 'var(--mono)' }}
                  required
                />
              </div>
            </div>
          </div>

          {/* Footer / Submit */}
          <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(59, 123, 246, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--tx1)', display: 'block' }}>SMART_ESCROW_ACTIVE</span>
                <span style={{ fontSize: '10px', color: 'var(--tx3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Funds will be locked until terminal verification</span>
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={loading || fetchingRate}
              style={{ 
                background: 'var(--blue)', 
                color: '#fff', 
                padding: '0 40px', 
                height: '52px', 
                borderRadius: '12px', 
                fontSize: '13px', 
                fontWeight: 700, 
                letterSpacing: '0.05em',
                boxShadow: '0 8px 20px rgba(59, 123, 246, 0.2)'
              }}
              className="hover:scale-[1.02] transition-all"
            >
              {loading ? 'INITIALIZING_PROTOCOL...' : 'EXECUTE_DISPATCH_PROTOCOL'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
