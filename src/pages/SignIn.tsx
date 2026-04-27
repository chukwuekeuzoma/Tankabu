import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SignIn() {
  const [tab, setTab] = useState<'op' | 'driver'>('op');
  const navigate = useNavigate();

  return (
    <div className="signin-wrap">
      <div className="signin-card">
        <div className="signin-logo">
          <div className="signin-mark">
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <path d="M2 13L9 4L16 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="6" y="13" width="6" height="3" rx="1" fill="white" />
            </svg>
          </div>
          <div>
            <div className="signin-brand">Tankabu</div>
            <div className="signin-sub">Operator Access</div>
          </div>
        </div>
        
        <div className="signin-tabs">
          <button 
            className={`stab ${tab === 'op' ? 'on' : ''}`} 
            onClick={() => setTab('op')}
          >
            Operator
          </button>
          <button 
            className={`stab ${tab === 'driver' ? 'on' : ''}`} 
            onClick={() => setTab('driver')}
          >
            Driver
          </button>
        </div>

        {tab === 'op' ? (
          <div>
            <div className="ff">
              <label className="ff-lbl">Email Address</label>
              <input className="ff-inp" type="email" defaultValue="adaeze.operator@atlasdepot.ng" />
            </div>
            <div className="ff">
              <label className="ff-lbl">Password</label>
              <input className="ff-inp" type="password" defaultValue="••••••••••••" />
            </div>
            <button className="signin-btn" onClick={() => navigate('/dashboard')}>
              Sign In to Dashboard
            </button>
          </div>
        ) : (
          <div>
            <div className="driver-id-row">
              <div className="ff">
                <label className="ff-lbl">Truck ID</label>
                <input className="ff-inp" placeholder="LND-456-XT" />
              </div>
              <div className="ff">
                <label className="ff-lbl">PIN</label>
                <input className="ff-inp" type="password" placeholder="••••" />
              </div>
            </div>
            <div className="ff">
              <label className="ff-lbl">Driver Name</label>
              <input className="ff-inp" placeholder="Emeka Okafor" />
            </div>
            <button className="signin-btn" style={{ background: 'var(--green)' }} onClick={() => navigate('/dashboard')}>
              Start Shipment Session
            </button>
          </div>
        )}

        <div className="signin-notice">
          <div className="sn-head">Blockchain Verification Active</div>
          <div className="sn-body">
            All shipment records are written immutably to the Kwala smart contract. Session activity is logged on-chain.
          </div>
        </div>
      </div>
    </div>
  );
}
