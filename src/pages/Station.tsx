import { useState } from 'react';
import { Fuel, ShieldAlert, MapPin, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Station() {
  const [loading, setLoading] = useState(false);
  const [manifestId, setManifestId] = useState('2847');
  const [recordedVolume, setRecordedVolume] = useState('28091');

  const handleConfirmDelivery = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock confirmation logic
    setTimeout(() => {
      setLoading(false);
      alert('Delivery Confirmed & Payment Released (Mock)');
    }, 1500);
  };

  return (
    <div className="dash-cols pb-10 md:p-7">
      <div className="fleet-card" style={{ gridColumn: 'span 12' }}>
        <div className="fleet-hd" style={{ borderBottom: '1px solid var(--br)', paddingBottom: '16px', marginBottom: '24px' }}>
          <span className="fleet-title flex items-center gap-2">
            <Fuel className="w-5 h-5 text-emerald-500" />
            Station Terminal // Receive Shipment
          </span>
          <span className="sn-txt">STATION OPERATOR</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <form onSubmit={handleConfirmDelivery} className="space-y-6">
            <div className="ic-group">
              <label className="ic-lbl flex items-center gap-2">
                <Activity className="w-3 h-3" /> Manifest ID
              </label>
              <Input 
                value={manifestId}
                onChange={(e) => setManifestId(e.target.value)}
                placeholder="Enter Manifest ID"
                required
              />
            </div>

            <div className="ic-group">
              <label className="ic-lbl flex items-center gap-2">
                <MapPin className="w-3 h-3" /> Recorded Volume (L)
              </label>
              <Input 
                type="number"
                value={recordedVolume}
                onChange={(e) => setRecordedVolume(e.target.value)}
                placeholder="Volume received"
                required
              />
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 h-auto rounded-xl font-bold uppercase tracking-widest text-xs"
              >
                {loading ? 'Confirming...' : 'CONFIRM_DELIVERY_&_RELEASE_PAYMENT'}
              </Button>
            </div>
          </form>

          <div className="space-y-6">
            <div className="anomaly-box" style={{ background: 'rgba(16,185,129,.05)', borderColor: 'rgba(16,185,129,.2)' }}>
              <div className="ab-row1 flex items-center gap-2 text-emerald-600">
                <ShieldAlert className="w-4 h-4" />
                <span className="ab-id">On-Chain Delivery Protocol</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                Confirming the delivery will trigger the smart contract to release the escrowed funds to the driver and depot. Ensure the recorded volume matches the physical meter reading.
              </p>
            </div>

            <div className="audit-table p-6 space-y-4">
               <div className="flex justify-between items-center">
                  <span className="ic-lbl">Current Escrow Balance</span>
                  <span className="ic-val blue">30,938 USDC</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="ic-lbl">Calculated Payout</span>
                  <span className="ic-val text-emerald-500">28,091 USDC</span>
               </div>
               <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                  <span className="ic-lbl">Anomaly Deduction</span>
                  <span className="ic-val text-rose-500">-2,847 USDC</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
