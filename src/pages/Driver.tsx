import React, { useState } from 'react';
import { Truck, MapPin, Search, Navigation, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useShipments } from '@/context/ShipmentContext';
import { useWallet } from '@/context/WalletContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BACKEND_API_URL, BACKEND_API_KEY } from '@/lib/constants';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';
import { FUEL_DISTRIBUTION_ADDRESS, FUEL_DISTRIBUTION_V2_ABI } from '@/lib/constants';

export function Driver() {
  const { account } = useWallet();
  const { shipments } = useShipments();
  const [manifestInput, setManifestInput] = useState('');
  const [activeShipment, setActiveShipment] = useState<any>(null);
  const [location, setLocation] = useState('');
  const [recordedVolume, setRecordedVolume] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearchManifest = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = shipments.find(s => s.id === manifestInput || s.id.includes(manifestInput));
    if (found) {
      setLoading(true);
      try {
        const response = await fetch(`${BACKEND_API_URL}/api/checkpoints?shipmentId=${found.id}`, {
          headers: { 'x-api-key': BACKEND_API_KEY }
        });
        const checkpointData = await response.json();
        
        const formattedCheckpoints = checkpointData.map((cp: any) => ({
          id: cp.id,
          name: cp.name,
          location: cp.location,
          status: cp.status,
          time: new Date(cp.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          volume: cp.volume_recorded ? `${cp.volume_recorded} L` : '---',
          variance: cp.variance ? `${cp.variance}%` : '---'
        }));

        setActiveShipment({ ...found, checkpoints: formattedCheckpoints });
      } catch (error) {
        console.error("Failed to fetch checkpoints", error);
        setActiveShipment(found);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Manifest ID not found or not authorized for this session.");
    }
  };

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(window as any).ethereum) return alert("Please install MetaMask.");
    
    setLoading(true);
    toast.loading("Broadcasting validation event...", { id: 'validate' });
    
    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const fuelFlow = new ethers.Contract(FUEL_DISTRIBUTION_ADDRESS, FUEL_DISTRIBUTION_V2_ABI, signer);

      // Call contract: validateCheckpoint(manifestId, locationName, recordedVolume)
      // manifestId is activeShipment.id (which is a stringified uint256 from the blockchain)
      const tx = await fuelFlow.validateCheckpoint(
        activeShipment.id,
        location,
        BigInt(recordedVolume)
      );

      toast.loading("Synchronizing with protocol...", { id: 'validate' });
      await tx.wait();

      toast.success("Checkpoint validated! Syncing with network...", { id: 'validate' });
      
      // Cleanup
      setLocation('');
      setRecordedVolume('');
      
      // Optional: Re-fetch manifest to show update if Kwala is fast enough
      // or just wait a bit and refresh
      setTimeout(() => {
        // Trigger a re-search to refresh the checkpoint list
        const mockEvent = { preventDefault: () => {} } as any;
        handleSearchManifest(mockEvent);
      }, 2000);

    } catch (error: any) {
      console.error("Validation failed:", error);
      toast.error(error.reason || "Transaction failed", { id: 'validate' });
    } finally {
      setLoading(false);
    }
  };

  if (!activeShipment) {
    return (
      <div className="dash-cols flex items-center justify-center min-h-[60vh]">
        <div className="fleet-card max-w-md w-full p-12 text-center" style={{ background: 'var(--bg2)', border: '1px solid var(--br)' }}>
          <div style={{ background: 'var(--blue)', width: '64px', height: '64px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Truck className="w-8 h-8 text-white" />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--tx1)', marginBottom: '8px' }}>Driver Terminal</h2>
          <p style={{ fontSize: '13px', color: 'var(--tx3)', marginBottom: '32px' }}>Enter your assigned Manifest ID to initialize the tracking protocol.</p>
          
          <form onSubmit={handleSearchManifest} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input 
                value={manifestInput}
                onChange={(e) => setManifestInput(e.target.value)}
                placeholder="e.g. SHP-2847"
                style={{ background: 'var(--bg3)', height: '56px', paddingLeft: '48px', fontSize: '16px', fontWeight: 700, fontFamily: 'var(--mono)', border: '1px solid var(--br)' }}
                required
              />
            </div>
            <Button 
              type="submit" 
              style={{ width: '100%', height: '56px', background: 'var(--blue)', color: 'white', borderRadius: '12px', fontWeight: 800, fontSize: '14px', letterSpacing: '0.05em' }}
            >
              INITIALIZE_MANIFEST
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="dash-cols">
      <div className="fleet-card" style={{ gridColumn: 'span 12', padding: '32px' }}>
        <div className="fleet-hd" style={{ borderBottom: '1px solid var(--br)', paddingBottom: '20px', marginBottom: '32px' }}>
          <div className="flex items-center gap-3">
            <div style={{ background: 'var(--blue)', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Navigation className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="fleet-title" style={{ fontSize: '18px', display: 'block' }}>Manifest Activity // {activeShipment.id}</span>
              <span className="sn-txt" style={{ fontSize: '9px', opacity: 0.6 }}>DRIVER_AUTH: {account?.slice(0, 10)}...</span>
            </div>
          </div>
          <button 
            onClick={() => setActiveShipment(null)}
            style={{ background: 'var(--bg3)', border: '1px solid var(--br)', borderRadius: '8px', padding: '8px 16px', fontSize: '10px', fontWeight: 700, color: 'var(--tx3)' }}
          >
            SWITCH_MANIFEST
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkpoints Status */}
          <div className="lg:col-span-1 space-y-6">
             <span className="sn-txt" style={{ color: 'var(--blue)', display: 'block' }}>ROUTE_MILESTONES</span>
             <div className="space-y-4">
               {activeShipment.checkpoints.map((cp: any, idx: number) => (
                 <div 
                   key={cp.id} 
                   style={{ 
                     background: 'var(--bg3)', 
                     border: '1px solid var(--br)', 
                     padding: '16px', 
                     borderRadius: '12px',
                     display: 'flex',
                     alignItems: 'center',
                     gap: '12px',
                     opacity: cp.status === 'PENDING' ? 0.6 : 1
                   }}
                 >
                   {cp.status === 'VERIFIED' ? (
                     <CheckCircle2 className="w-5 h-5 text-green-500" />
                   ) : cp.status === 'ANOMALY' ? (
                     <ShieldAlert className="w-5 h-5 text-red-500" />
                   ) : (
                     <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px dashed var(--br)' }}></div>
                   )}
                   <div>
                     <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--tx1)' }}>{cp.name}</div>
                     <div style={{ fontSize: '10px', color: 'var(--tx3)' }}>{cp.status}</div>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Validation Form */}
          <div className="lg:col-span-2">
             <form onSubmit={handleValidate} className="space-y-8" style={{ background: 'var(--bg3)', padding: '32px', borderRadius: '16px', border: '1px solid var(--br)' }}>
                <div style={{ borderLeft: '2px solid var(--blue)', paddingLeft: '16px', marginBottom: '24px' }}>
                  <span className="sn-txt" style={{ color: 'var(--blue)', marginBottom: '4px', display: 'block' }}>LOG_CURRENT_LOCATION</span>
                  <p style={{ fontSize: '11px', color: 'var(--tx3)' }}>This action will trigger an on-chain event and update the central DB via Kwala.</p>
                </div>
                
                <div className="ic-group">
                  <label className="ic-lbl flex items-center gap-2 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" /> CURRENT_CHECKPOINT_NAME
                  </label>
                  <select 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{ 
                      background: 'var(--bg)', 
                      height: '52px', 
                      fontSize: '15px', 
                      fontWeight: 600, 
                      width: '100%', 
                      borderRadius: 'calc(var(--radius) - 2px)', 
                      border: '1px solid var(--br)', 
                      color: 'var(--tx1)', 
                      padding: '0 16px',
                      appearance: 'none',
                      cursor: 'pointer'
                    }}
                    required
                  >
                    <option value="" disabled>Select checkpoint to validate</option>
                    {activeShipment.checkpoints.map((cp: any) => (
                      <option key={cp.id} value={cp.name} disabled={cp.status === 'VERIFIED'}>
                        {cp.name} {cp.status === 'VERIFIED' ? '(Already Verified)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="ic-group">
                  <label className="ic-lbl flex items-center gap-2 mb-2">
                    <Truck className="w-3.5 h-3.5 text-blue-500" /> DIP_READING_RECORDED (L)
                  </label>
                  <Input 
                    type="number"
                    value={recordedVolume}
                    onChange={(e) => setRecordedVolume(e.target.value)}
                    placeholder="Enter liters currently in tank"
                    style={{ background: 'var(--bg)', height: '52px', fontSize: '15px', fontWeight: 600 }}
                    required
                  />
                </div>

                <div className="pt-4">
                   <Button 
                     type="submit" 
                     disabled={loading}
                     style={{ width: '100%', height: '56px', background: 'var(--blue)', color: 'white', borderRadius: '12px', fontWeight: 800, letterSpacing: '0.05em' }}
                   >
                     {loading ? 'SYNCHRONIZING_WITH_PROTOCOL...' : 'SUBMIT_VALIDATION_EVENT'}
                   </Button>
                </div>
             </form>

             <div style={{ marginTop: '24px', padding: '24px', background: 'rgba(59, 123, 246, 0.03)', borderRadius: '16px', border: '1px dashed var(--br)' }}>
                <div className="flex gap-4">
                   <ShieldAlert className="w-6 h-6 text-blue-500" />
                   <div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--tx1)', display: 'block' }}>HYBRID_SYNC_PROTOCOL</span>
                      <p style={{ fontSize: '11px', color: 'var(--tx2)', marginTop: '6px', lineHeight: '1.6' }}>
                        Your validation will be recorded on the blockchain first. Kwala will then capture this event and automatically notify the backend SQL database to update your fleet's status in real-time.
                      </p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
