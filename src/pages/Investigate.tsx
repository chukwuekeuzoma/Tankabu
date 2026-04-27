
import { useNavigate } from 'react-router-dom';

export function Investigate() {
  const navigate = useNavigate();

  return (
    <>
      <div className="dash-header" style={{ marginBottom: '22px' }}>
        <div className="dash-brand-row">
          <div className="dash-mark">
            <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
              <path d="M2 13L9 4L16 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="6" y="13" width="6" height="3" rx="1" fill="white" />
            </svg>
          </div>
          <span className="dash-title-sec">Tankabu</span>
          <span style={{ color: 'var(--br2)', margin: '0 6px' }}>|</span>
          <span className="dash-title-page">Investigate SHP-2847</span>
        </div>
        <div className="dash-header-right">
          <button className="btn-outline">Download On-chain Log</button>
          <button className="btn-blue" onClick={() => navigate('/escalate')}>
            Resolve / Escalate
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: '-2px' }}>
              <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div style={{ padding: '0 28px' }}>
        <div className="inv-contract-card">
          <div className="ic-group"><span className="ic-lbl">Smart Contract</span><span className="ic-val blue">0x2F4a8bC9...9E3d1A7f</span></div>
          <div className="ic-group"><span className="ic-lbl">Alert Block</span><span className="ic-val">#4,729,183</span></div>
          <div className="ic-group"><span className="ic-lbl">Alert TX</span><span className="ic-val blue">0xd8e2c495...f102a7b3</span></div>
          <div className="ic-group"><span className="ic-lbl">Max Variance</span><span className="ic-val alert">6% threshold breached</span></div>
        </div>

        <div className="audit-table">
          <div className="at-hd">
            <span className="at-title">Volume Audit Trail (Immutable)</span>
            <span className="at-sub">Cryptographically signed by depot and driver</span>
          </div>
          <table className="at-tbl">
            <thead>
              <tr>
                <th>Checkpoint</th>
                <th>Recorded Vol</th>
                <th>Variance</th>
                <th>Signer</th>
                <th>On-chain Proof</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="at-chk">
                    <span className="at-chk-name">Atlas Depot Gate</span>
                    <span className="at-chk-time">06:14 · 0xe7F...1c9</span>
                  </div>
                </td>
                <td className="at-vol rec-ok">33,000 L</td>
                <td className="at-var ok">0 L</td>
                <td><span className="badge-custom b-route">Operator</span></td>
                <td><span className="tx">0x4f3a...e3f4</span></td>
              </tr>
              <tr>
                <td>
                  <div className="at-chk">
                    <span className="at-chk-name">Sagamu Interchange</span>
                    <span className="at-chk-time">08:47 · 0x8a2...3b1</span>
                  </div>
                </td>
                <td className="at-vol rec-ok">32,298 L</td>
                <td className="at-var ok">−42 L (0.1%)</td>
                <td><span className="badge-custom b-kwala">Driver Sign</span></td>
                <td><span className="tx">0x7c1d...a901</span></td>
              </tr>
              <tr>
                <td>
                  <div className="at-chk">
                    <span className="at-chk-name">Ore Junction</span>
                    <span className="at-chk-time">11:22 · 0x8a2...3b1</span>
                  </div>
                </td>
                <td className="at-vol rec-ok">31,570 L</td>
                <td className="at-var ok">−68 L (0.2%)</td>
                <td><span className="badge-custom b-kwala">Driver Sign</span></td>
                <td><span className="tx">0xa2b9...d231</span></td>
              </tr>
              <tr className="at-alert-row">
                <td>
                  <div className="at-chk">
                    <span className="at-chk-name alrt">Benin City Gate</span>
                    <span className="at-chk-time">13:41 · 0x3d4...a1f</span>
                  </div>
                </td>
                <td className="at-vol rec-alert">28,091 L</td>
                <td className="at-var bad">−2,847 L (8.6%)</td>
                <td><span className="badge-custom b-alert">Smart Meter</span></td>
                <td><span className="tx">0xd8e2...a7b3</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="sc-card">
          <div className="sc-hd">
            <span className="sc-title">Contract Verification Logic</span>
            <span className="sc-ref">View on Kwala Explorer ↗</span>
          </div>
          <div className="sc-body">
            <div className="code-block">
              <span className="kw">function</span> <span className="fn">verifyVolume</span>(uint256 shipmentId, uint256 currentVol) <span className="kw">external</span> {'{'} <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;Shipment <span className="kw">storage</span> shp = shipments[shipmentId];<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;uint256 expected = calculateExpected(shp.startVol, shp.routeDistance);<br/>
              <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">if</span> (currentVol &lt; expected) {'{'}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;uint256 loss = expected - currentVol;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;uint256 lossPct = (loss * <span className="num">10000</span>) / expected;<br/>
              <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="com">// Check if loss exceeds 6% (600 basis points)</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">if</span> (lossPct &gt; shp.allowedVarianceBps) {'{'}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;shp.status = ShipmentStatus.<span className="str">ALERT</span>;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="emit-kw">emit</span> DiversionAlert(shipmentId, msg.sender, loss);<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br/>
              {'}'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
