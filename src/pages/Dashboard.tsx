import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <div className="dash-header">
        <div className="dash-brand-row">
          <div className="dash-mark">
            <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
              <path d="M2 13L9 4L16 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="6" y="13" width="6" height="3" rx="1" fill="white" />
            </svg>
          </div>
          <span className="dash-title-sec">Tankabu</span>
          <span style={{ color: 'var(--br2)', margin: '0 6px' }}>|</span>
          <span className="dash-title-page">Operations Dashboard</span>
        </div>
        <div className="dash-header-right">
          <div className="kwala-badge">
            <div className="kwala-dot"></div>Kwala Mainnet
          </div>
          <div className="oa-av">OA</div>
        </div>
      </div>

      <div className="alert-banner">
        <div className="alert-pulse"></div>
        <span className="ab-label">ACTIVE ALERT</span>
        <span className="ab-txt">
          <b>SHP-2847</b> — Volume anomaly at <strong>Benin City Gate</strong>. 2,847 L unaccounted (8.6% loss). Threshold: 6%.
        </span>
        <span className="ab-time">13:41</span>
      </div>

      <div style={{ padding: '22px 28px 40px' }}>
        <div className="dash-cols">
          <div className="fleet-card">
            <div className="fleet-hd">
              <span className="fleet-title">Active Fleet</span>
              <span className="fleet-count">5 trucks active</span>
            </div>
            
            <div className="fleet-item alert-row" onClick={() => navigate('/shipment/2847')}>
              <div className="fi-row1">
                <span className="fi-id alrt">SHP-2847</span>
                <span className="badge-custom b-alert">ALERT</span>
              </div>
              <div className="fi-meta">Emeka Okafor · LND-456-XT<br/>Lagos → Warri</div>
              <div className="fi-prog-wrap">
                <div className="fi-prog" style={{ width: '60%', background: 'var(--red)' }}></div>
              </div>
              <div className="fi-eta">ETA 16:30</div>
            </div>

            <div className="fleet-item">
              <div className="fi-row1">
                <span className="fi-id ok">SHP-2851</span>
                <span className="badge-custom b-route">On Route</span>
              </div>
              <div className="fi-meta">Chidi Nwosu · ABJ-234-KT<br/>Warri → Abuja</div>
              <div className="fi-prog-wrap">
                <div className="fi-prog" style={{ width: '38%', background: 'var(--blue)' }}></div>
              </div>
              <div className="fi-eta">ETA 19:15</div>
            </div>

            <div className="fleet-item">
              <div className="fi-row1">
                <span className="fi-id ok">SHP-2844</span>
                <span className="badge-custom b-route">On Route</span>
              </div>
              <div className="fi-meta">Yusuf Bello · KN-087-WX<br/>PH → Lagos</div>
              <div className="fi-prog-wrap">
                <div className="fi-prog" style={{ width: '72%', background: 'var(--blue)' }}></div>
              </div>
              <div className="fi-eta">ETA 15:45</div>
            </div>

            <div className="fleet-item">
              <div className="fi-row1">
                <span className="fi-id ok">SHP-2839</span>
                <span className="badge-custom b-route">On Route</span>
              </div>
              <div className="fi-meta">Biodun Adeyemi · OY-331-FG<br/>Ibadan → Kaduna</div>
              <div className="fi-prog-wrap">
                <div className="fi-prog" style={{ width: '22%', background: 'var(--blue)' }}></div>
              </div>
              <div className="fi-eta">ETA 21:00</div>
            </div>

            <div className="fleet-item">
              <div className="fi-row1">
                <span className="fi-id ok">SHP-2853</span>
                <span className="badge-custom b-route">On Route</span>
              </div>
              <div className="fi-meta">Tunde Fashola · EK-119-SA<br/>Kano → Lagos</div>
              <div className="fi-prog-wrap">
                <div className="fi-prog" style={{ width: '8%', background: 'var(--blue)' }}></div>
              </div>
              <div className="fi-eta">ETA Tomorrow</div>
            </div>
          </div>

          <div className="map-card">
            <div className="map-hd">
              <span className="map-title">Live Route Map — SHP-2847</span>
              <span className="badge-custom b-alert" style={{ animation: 'pulse 1.8s ease infinite' }}>ALERT</span>
            </div>
            <div className="map-svg-wrap">
              <svg viewBox="0 0 680 190" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', overflow: 'visible' }}>
                <path d="M 68 118 Q 140 82 200 76 Q 270 70 336 82 Q 402 94 456 102 Q 510 110 590 116" stroke="#1C2E42" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 68 118 Q 140 82 200 76 Q 270 70 336 82" stroke="#3B7BF6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 336 82 Q 402 94 456 102" stroke="#EF4444" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="7 4" />
                <path d="M 456 102 Q 510 110 590 116" stroke="#1C2E42" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                <circle cx="68" cy="118" r="11" fill="#22C55E" stroke="#060D18" strokeWidth="2.5" />
                <text x="68" y="123" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="DM Sans">✓</text>
                <text x="68" y="142" textAnchor="middle" fill="#6A82A0" fontSize="10" fontFamily="DM Sans">Lagos</text>
                <text x="68" y="154" textAnchor="middle" fill="#364E68" fontSize="9" fontFamily="DM Sans">Apapa Depot</text>

                <circle cx="200" cy="76" r="11" fill="#22C55E" stroke="#060D18" strokeWidth="2.5" />
                <text x="200" y="81" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="DM Sans">✓</text>
                <text x="200" y="58" textAnchor="middle" fill="#6A82A0" fontSize="10" fontFamily="DM Sans">Sagamu</text>
                <text x="200" y="68" textAnchor="middle" fill="#364E68" fontSize="9" fontFamily="DM Sans">Interchange</text>

                <circle cx="336" cy="82" r="11" fill="#22C55E" stroke="#060D18" strokeWidth="2.5" />
                <text x="336" y="87" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="DM Sans">✓</text>
                <text x="336" y="104" textAnchor="middle" fill="#6A82A0" fontSize="10" fontFamily="DM Sans">Ore</text>
                <text x="336" y="115" textAnchor="middle" fill="#364E68" fontSize="9" fontFamily="DM Sans">Junction</text>

                <g className="lnd-marker">
                  <rect x="434" y="52" width="44" height="22" rx="5" fill="#F59E0B" />
                  <text x="456" y="67" textAnchor="middle" fill="#060D18" fontSize="11" fontWeight="700" fontFamily="DM Sans">LND</text>
                </g>
                <line x1="456" y1="74" x2="456" y2="89" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 3" />

                <circle cx="456" cy="102" r="13" fill="#EF4444" stroke="#060D18" strokeWidth="2.5" />
                <text x="456" y="107" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="DM Sans">!</text>
                <text x="456" y="124" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="600" fontFamily="DM Sans">Benin City</text>
                <text x="456" y="135" textAnchor="middle" fill="#364E68" fontSize="9" fontFamily="DM Sans">Gate ▲</text>

                <circle cx="590" cy="116" r="11" fill="none" stroke="#364E68" strokeWidth="2" strokeDasharray="4 3" />
                <text x="590" y="138" textAnchor="middle" fill="#364E68" fontSize="10" fontFamily="DM Sans">Warri</text>
                <text x="590" y="149" textAnchor="middle" fill="#364E68" fontSize="9" fontFamily="DM Sans">Terminal</text>
              </svg>
            </div>
            <div className="anomaly-box">
              <div className="ab-row1">
                <span className="ab-id">SHP-2847 — Anomaly at Checkpoint 4</span>
              </div>
              <div className="ab-metrics">
                Expected: <span>30,938 L</span> · Recorded: <span className="neg">28,091 L</span> · Δ <span className="neg">−2,847 L (−8.6%)</span>
              </div>
              <div className="ab-chain">
                <span className="ck-tx-lbl">Contract auto-fired · block #4,729,183 · tx: </span>
                <span className="tx">0xd8e2c495...f102a7b3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="block-footer">
        Block <span className="bf-block">#4,729,183</span> · Kwala Mainnet · <span>Last sync: 3s ago</span>
      </div>
    </>
  );
}
