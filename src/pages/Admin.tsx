import React, { useState, useEffect } from 'react';
import { Settings, ShieldCheck, Loader2, Save, Fuel } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';
import { 
  FUEL_DISTRIBUTION_ADDRESS, 
  FUEL_DISTRIBUTION_V2_ABI 
} from '@/lib/constants';

const PRODUCT_TYPES = [
  { id: 'PMS', name: 'PREMIUM MOTOR SPIRIT (PMS)' },
  { id: 'AGO', name: 'AUTOMOTIVE GAS OIL (AGO)' },
  { id: 'DPK', name: 'DUAL PURPOSE KEROSENE (DPK)' },
];

export function Admin() {
  const { account } = useWallet();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [rates, setRates] = useState<Record<string, string>>({
    PMS: '0.00',
    AGO: '0.00',
    DPK: '0.00',
  });
  const [newRates, setNewRates] = useState<Record<string, string>>({
    PMS: '',
    AGO: '',
    DPK: '',
  });

  const fetchRates = async () => {
    if (!(window as any).ethereum) return;
    setFetching(true);
    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const fuelFlow = new ethers.Contract(FUEL_DISTRIBUTION_ADDRESS, FUEL_DISTRIBUTION_V2_ABI, provider);
      
      const updatedRates: Record<string, string> = {};
      for (const product of PRODUCT_TYPES) {
        const productTypeBytes = ethers.id(product.id);
        const rate = await fuelFlow.productRates(productTypeBytes);
        updatedRates[product.id] = ethers.formatUnits(rate, 18);
      }
      setRates(updatedRates);
    } catch (err) {
      console.error("Failed to fetch rates:", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const handleUpdateRate = async (productId: string) => {
    if (!(window as any).ethereum) return toast.error("Please install MetaMask.");
    if (!newRates[productId]) return toast.error("Please enter a new rate.");

    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const fuelFlow = new ethers.Contract(FUEL_DISTRIBUTION_ADDRESS, FUEL_DISTRIBUTION_V2_ABI, signer);

      const productTypeBytes = ethers.id(productId);
      const rateWei = ethers.parseUnits(newRates[productId], 18);

      toast.loading(`Updating rate for ${productId}...`, { id: 'admin' });
      const tx = await fuelFlow.updateRate(productTypeBytes, rateWei);
      await tx.wait();

      toast.success(`Rate for ${productId} updated successfully!`, { id: 'admin' });
      setNewRates(prev => ({ ...prev, [productId]: '' }));
      await fetchRates();
    } catch (error: any) {
      console.error(error);
      toast.error(`Update Failed: ${error.reason || error.message}`, { id: 'admin' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dash-cols">
      <div className="fleet-card" style={{ gridColumn: 'span 12', padding: '32px' }}>
        <div className="fleet-hd" style={{ borderBottom: '1px solid var(--br)', paddingBottom: '20px', marginBottom: '32px' }}>
          <div className="flex items-center gap-3">
            <div style={{ background: 'var(--blue)', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="fleet-title" style={{ fontSize: '18px', display: 'block' }}>Admin Protocol</span>
              <span className="sn-txt" style={{ fontSize: '9px', opacity: 0.6 }}>PROTOCOL_V2.4.0 // RATE_MANAGEMENT</span>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div style={{ borderLeft: '2px solid var(--blue)', paddingLeft: '16px' }}>
            <span className="sn-txt" style={{ color: 'var(--blue)', marginBottom: '8px', display: 'block' }}>01. GLOBAL PRODUCT RATES</span>
            <p style={{ fontSize: '12px', color: 'var(--tx3)' }}>Update on-chain fuel rates for all dispatchers. Requires ADMIN_ROLE.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCT_TYPES.map((product) => (
              <div key={product.id} className="fleet-item" style={{ padding: '20px', background: 'var(--bg2)', border: '1px solid var(--br)', borderRadius: '12px', cursor: 'default' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Fuel className="w-4 h-4 text-blue-500" />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--tx1)' }}>{product.id}</span>
                </div>
                
                <div className="mb-6">
                  <span style={{ fontSize: '10px', color: 'var(--tx3)', display: 'block', marginBottom: '4px' }}>CURRENT_RATE</span>
                  <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--blue)' }}>
                    {fetching ? '...' : `${rates[product.id]} USDC/L`}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="ic-group">
                    <label className="ic-lbl mb-1 text-[10px]">NEW_RATE (USDC)</label>
                    <Input 
                      type="number" 
                      value={newRates[product.id]}
                      onChange={(e) => setNewRates(prev => ({ ...prev, [product.id]: e.target.value }))}
                      placeholder="0.00"
                      style={{ height: '38px', background: 'var(--bg3)', border: '1px solid var(--br)', fontSize: '12px' }}
                    />
                  </div>
                  <Button 
                    onClick={() => handleUpdateRate(product.id)}
                    disabled={loading || !newRates[product.id]}
                    style={{ 
                      width: '100%',
                      background: 'var(--blue)', 
                      color: '#fff', 
                      height: '38px', 
                      borderRadius: '8px', 
                      fontSize: '12px', 
                      fontWeight: 700,
                    }}
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4 mr-2" /> UPDATE_RATE</>}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-10 border-t border-slate-800 flex items-center gap-4">
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(59, 123, 246, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--tx1)', display: 'block' }}>ADMIN_PROTOCOL_ACTIVE</span>
              <span style={{ fontSize: '10px', color: 'var(--tx3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Only authorized administrators can modify these parameters</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
