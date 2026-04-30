export function ShipmentDetail() {
  return (
    <div className="pb-10 md:px-7">
      <div className="detail-cols">
        <div>
          <div className="shp-card">
            <div className="shp-id-row">
              <span className="shp-id">SHP-2847</span>
              <span className="badge-custom b-alert">ALERT</span>
            </div>
            <div className="shp-meta-grid">
              <div className="smg"><span className="smg-lbl">Driver</span><span className="smg-val">Emeka Okafor</span></div>
              <div className="smg"><span className="smg-lbl">Truck</span><span className="smg-val">LND-456-XT</span></div>
              <div className="smg"><span className="smg-lbl">Product</span><span className="smg-val">PMS</span></div>
              <div className="smg"><span className="smg-lbl">Loaded</span><span className="smg-val" style={{ fontFamily: 'var(--mono)' }}>33,000 L</span></div>
              <div className="smg"><span className="smg-lbl">From</span><span className="smg-val">Apapa, Lagos</span></div>
              <div className="smg"><span className="smg-lbl">To</span><span className="smg-val">Warri</span></div>
            </div>
            <div className="contract-row">
              <div className="smg">
                <span className="smg-lbl">Contract</span>
                <span className="tx" style={{ fontSize: '11px', marginTop: '3px', display: 'block' }}>0x2F4a8bC9f13D7E2a...9E3d1A7f</span>
              </div>
            </div>
          </div>

          <div className="map-mini">
            <div className="map-mini-hd">Route · Lagos → Warri</div>
            <div className="map-mini-body">
              <svg viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
                <path d="M 30 110 Q 70 78 105 72 Q 148 66 180 76 Q 215 86 240 94 Q 268 102 310 108" stroke="#1C2E42" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M 30 110 Q 70 78 105 72 Q 148 66 180 76" stroke="#3B7BF6" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M 180 76 Q 215 86 240 94" stroke="#EF4444" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="4 2" />
                <circle cx="30" cy="110" r="8" fill="#22C55E" stroke="#060D18" strokeWidth="1.5" />
                <text x="30" y="114" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="DM Sans">✓</text>
                <circle cx="105" cy="72" r="8" fill="#22C55E" stroke="#060D18" strokeWidth="1.5" />
                <text x="105" y="76" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="DM Sans">✓</text>
                <circle cx="180" cy="76" r="8" fill="#22C55E" stroke="#060D18" strokeWidth="1.5" />
                <text x="180" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="DM Sans">✓</text>
                <circle cx="240" cy="94" r="8" fill="#EF4444" stroke="#060D18" strokeWidth="1.5" />
                <text x="240" y="98" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="DM Sans">!</text>
                <circle cx="310" cy="108" r="7" fill="none" stroke="#364E68" strokeWidth="1.5" strokeDasharray="3 2" />
                <text x="30" y="126" textAnchor="middle" fill="#364E68" fontSize="8" fontFamily="DM Sans">Lagos</text>
                <text x="105" y="60" textAnchor="middle" fill="#364E68" fontSize="8" fontFamily="DM Sans">Sagamu</text>
                <text x="180" y="64" textAnchor="middle" fill="#364E68" fontSize="8" fontFamily="DM Sans">Ore</text>
                <text x="240" y="112" textAnchor="middle" fill="#EF4444" fontSize="8" fontFamily="DM Sans">Benin City</text>
                <text x="310" y="125" textAnchor="middle" fill="#364E68" fontSize="8" fontFamily="DM Sans">Warri</text>
              </svg>
            </div>
          </div>
        </div>

        <div className="cklog-card">
          <div className="cklog-hd">
            <span className="cklog-title">Checkpoint Log</span>
            <span className="cklog-sub">On-chain · immutable</span>
          </div>

          <div className="ck-item ck-pass">
            <div className="ck-head">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div className="ck-icon pass">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div><div className="ck-loc ok">Atlas Depot Gate</div><div className="ck-subloc">Apapa, Lagos</div></div>
              </div>
              <div className="ck-badge-time"><span className="badge-custom b-route">Passed</span><span className="ck-time">06:14</span></div>
            </div>
            <div className="ck-metrics">
              <div className="ck-m"><span className="ck-m-lbl">Expected</span><span className="ck-m-val neu">33,000 L</span></div>
              <div className="ck-m"><span className="ck-m-lbl">Recorded</span><span className="ck-m-val ok">33,000 L</span></div>
              <div className="ck-m"><span className="ck-m-lbl">Variance</span><span className="ck-m-val dim">0 L</span></div>
            </div>
            <div className="ck-tx"><span className="ck-tx-lbl">TX</span><span className="tx">0x4f3a9c2b...b291e3f4</span></div>
          </div>

          <div className="ck-item ck-pass">
            <div className="ck-head">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div className="ck-icon pass">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div><div className="ck-loc ok">Sagamu Interchange</div><div className="ck-subloc">Sagamu, Ogun State</div></div>
              </div>
              <div className="ck-badge-time"><span className="badge-custom b-route">Passed</span><span className="ck-time">08:47</span></div>
            </div>
            <div className="ck-metrics">
              <div className="ck-m"><span className="ck-m-lbl">Expected</span><span className="ck-m-val neu">32,340 L</span></div>
              <div className="ck-m"><span className="ck-m-lbl">Recorded</span><span className="ck-m-val ok">32,298 L</span></div>
              <div className="ck-m"><span className="ck-m-lbl">Variance</span><span className="ck-m-val dim">−42 L</span></div>
            </div>
            <div className="ck-tx"><span className="ck-tx-lbl">TX</span><span className="tx">0x7c1de3f2...e384a901</span></div>
          </div>

          <div className="ck-item ck-pass">
            <div className="ck-head">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div className="ck-icon pass">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div><div className="ck-loc ok">Ore Junction</div><div className="ck-subloc">Ore, Ondo State</div></div>
              </div>
              <div className="ck-badge-time"><span className="badge-custom b-route">Passed</span><span className="ck-time">11:22</span></div>
            </div>
            <div className="ck-metrics">
              <div className="ck-m"><span className="ck-m-lbl">Expected</span><span className="ck-m-val neu">31,638 L</span></div>
              <div className="ck-m"><span className="ck-m-lbl">Recorded</span><span className="ck-m-val ok">31,570 L</span></div>
              <div className="ck-m"><span className="ck-m-lbl">Variance</span><span className="ck-m-val dim">−68 L</span></div>
            </div>
            <div className="ck-tx"><span className="ck-tx-lbl">TX</span><span className="tx">0xa2b9f107...c849d231</span></div>
          </div>

          <div className="ck-item ck-alert">
            <div className="ck-head">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div className="ck-icon fail" style={{ animation: 'pulse 1.8s ease infinite' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <line x1="6" y1="3" x2="6" y2="7" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="6" cy="9" r="0.8" fill="#EF4444" />
                  </svg>
                </div>
                <div><div className="ck-loc alrt">Benin City Gate</div><div className="ck-subloc">Benin City, Edo State</div></div>
              </div>
              <div className="ck-badge-time"><span className="badge-custom b-alert">ALERT</span><span className="ck-time">13:41</span></div>
            </div>
            <div className="ck-metrics" style={{ background: 'rgba(239,68,68,.06)', border: '1px solid rgba(239,68,68,.15)' }}>
              <div className="ck-m"><span className="ck-m-lbl">Expected</span><span className="ck-m-val neu">30,938 L</span></div>
              <div className="ck-m"><span className="ck-m-lbl">Recorded</span><span className="ck-m-val alrt">28,091 L</span></div>
              <div className="ck-m"><span className="ck-m-lbl">Variance</span><span className="ck-m-val alrt">−2,847 L (8.6%)</span></div>
            </div>
            <div className="ck-tx"><span className="ck-tx-lbl">TX</span><span className="tx">0xd8e2c495...f102a7b3</span></div>
          </div>

          <div className="ck-item ck-pass">
            <div className="ck-head">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div className="ck-icon pend" style={{ fontSize: '10px', color: 'var(--tx3)' }}>5</div>
                <div><div className="ck-loc" style={{ color: 'var(--tx3)' }}>Warri Terminal</div><div className="ck-subloc">Warri, Delta State</div></div>
              </div>
              <div className="ck-badge-time"><span className="badge-custom b-pending">Pending</span></div>
            </div>
            <div className="ck-metrics" style={{ opacity: 0.4 }}>
              <div className="ck-m"><span className="ck-m-lbl">Expected</span><span className="ck-m-val dim">27,541 L</span></div>
              <div className="ck-m"><span className="ck-m-lbl">Recorded</span><span className="ck-m-val dim">—</span></div>
              <div className="ck-m"><span className="ck-m-lbl">Variance</span><span className="ck-m-val dim">—</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
