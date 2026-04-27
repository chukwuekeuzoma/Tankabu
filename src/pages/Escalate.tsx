import { useState } from 'react';

export function Escalate() {
  const [option, setOption] = useState<string>('op');
  const [step, setStep] = useState<'form' | 'writing' | 'success'>('form');
  const [writingStep, setWritingStep] = useState(0);

  const handleSubmit = () => {
    setStep('writing');
    
    setTimeout(() => setWritingStep(1), 1200);
    setTimeout(() => setWritingStep(2), 2500);
    setTimeout(() => setStep('success'), 3500);
  };

  return (
    <div className="esc-wrap">
      {step === 'form' && (
        <div id="esc-form">
          <div className="ph" style={{ marginBottom: '24px' }}>
            <span className="ph-eyebrow">Incident Resolution</span>
            <h1 className="ph-t" style={{ fontSize: '28px', marginTop: 0 }}>Escalate SHP-2847</h1>
            <p className="ph-s">
              <span style={{ color: 'var(--red)', fontWeight: 500 }}>Alert: 2,847 L Unaccounted</span>
              <span className="ph-dot"></span>
              Benin City Checkpoint
            </p>
          </div>

          <div className="esc-alert-banner">
            <div className="eab-id">Diversion Alert Confirmed</div>
            <div className="eab-meta">Smart contract automatically flagged this shipment. You must select a resolution path to unfreeze the remaining funds.</div>
          </div>

          <div className="esc-section-title">Select Action</div>
          
          <div className={`esc-option ${option === 'op' ? 'sel' : ''}`} onClick={() => setOption('op')}>
            <div className="esc-radio"><div className="esc-radio-dot"></div></div>
            <div>
              <div className="esc-opt-title">Escalate to Law Enforcement (Operations)</div>
              <div className="esc-opt-desc">Trigger automatic geofencing. Lock driver wallet. Send immutable proof to authorities.</div>
            </div>
          </div>

          <div className={`esc-option ${option === 'false' ? 'sel' : ''}`} onClick={() => setOption('false')}>
            <div className="esc-radio"><div className="esc-radio-dot"></div></div>
            <div>
              <div className="esc-opt-title">Mark as False Positive (Leak/Accident)</div>
              <div className="esc-opt-desc">Driver must submit photo evidence. Overrides contract alert.</div>
            </div>
          </div>

          <div style={{ marginTop: '24px', marginBottom: '24px' }}>
            <label className="esc-notes-lbl">Operator Notes (Will be hashed on-chain)</label>
            <textarea className="esc-notes" placeholder="Enter details of your investigation..." defaultValue="Spoke to driver at 14:02. Claimed accident but no proof provided. Telematics show 12min stop outside designated route. Escalate immediately."></textarea>
          </div>

          <div className="esc-chain-notice">
            <div className="ecn-lbl">Immutable Action</div>
            <div className="ecn-body">This action will be written to the Kwala network. It cannot be reversed or deleted by any operator.</div>
          </div>

          <button className="btn-red" onClick={handleSubmit}>
            Confirm Escalation
          </button>
        </div>
      )}

      {step === 'writing' && (
        <div className="esc-writing show">
          <div className="esc-spinner"></div>
          <div className="esc-writing-title">Writing to Blockchain</div>
          <div className="esc-writing-sub">Please do not close this window</div>
          
          <div className="esc-writing-steps">
            <div className={`esc-ws ${writingStep >= 0 ? (writingStep > 0 ? 'done' : 'active') : ''}`}>
              <div className="esc-ws-dot"></div> Preparing transaction payload
            </div>
            <div className={`esc-ws ${writingStep >= 1 ? (writingStep > 1 ? 'done' : 'active') : ''}`} style={{ opacity: writingStep >= 1 ? 1 : 0.4 }}>
              <div className="esc-ws-dot"></div> Awaiting wallet signature
            </div>
            <div className={`esc-ws ${writingStep >= 2 ? (writingStep > 2 ? 'done' : 'active') : ''}`} style={{ opacity: writingStep >= 2 ? 1 : 0.4 }}>
              <div className="esc-ws-dot"></div> Confirming block on Kwala network
            </div>
          </div>
        </div>
      )}

      {step === 'success' && (
        <div className="esc-confirmed show">
          <div className="confirm-check">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 13L9 17L19 7" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="conf-title">Escalation Confirmed</div>
          <div className="conf-sub">Incident report is now immutable and authorities notified.</div>

          <div className="conf-tx-box">
            <div className="conf-tx-lbl">Transaction Hash</div>
            <div className="conf-tx-hash">0xf8a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0</div>
            <div className="conf-tx-meta">Block #4,729,185 · Included 4s ago</div>
          </div>

          <div className="conf-nnpc">NNPC API synced: <b>SUCCESS</b></div>
        </div>
      )}
    </div>
  );
}
