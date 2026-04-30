import { MapPin, CheckCircle2, Activity } from 'lucide-react';

const MOCK_CHECKPOINTS = [
  { id: 1, name: 'APAPA DEPOT', location: 'Lagos', status: 'VERIFIED', time: '08:30 AM', volume: '30,938 L', variance: '0.0%' },
  { id: 2, name: 'SAGAMU INTERCHANGE', location: 'Ogun', status: 'VERIFIED', time: '10:15 AM', volume: '30,935 L', variance: '-0.01%' },
  { id: 3, name: 'ORE JUNCTION', location: 'Ondo', status: 'VERIFIED', time: '12:45 PM', volume: '30,930 L', variance: '-0.02%' },
  { id: 4, name: 'BENIN CITY GATE', location: 'Edo', status: 'ANOMALY', time: '14:20 PM', volume: '28,091 L', variance: '-8.6%' },
  { id: 5, name: 'WARRI TERMINAL', location: 'Delta', status: 'PENDING', time: 'ETA 16:30 PM', volume: '---', variance: '---' },
];

export function Checkpoints() {
  return (
    <div className="dash-cols pb-10 md:p-7">
      <div className="fleet-card" style={{ gridColumn: 'span 12' }}>
        <div className="fleet-hd" style={{ marginBottom: '24px' }}>
          <span className="fleet-title flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-500" />
            Route Checkpoints // SHP-2847
          </span>
          <div className="flex items-center gap-3">
             <span className="badge-custom b-alert">ANOMALY DETECTED</span>
          </div>
        </div>

        <div className="audit-table">
          <div className="at-hd">
            <span className="at-title">Validation Log</span>
            <span className="at-sub font-mono">Last updated: 2 mins ago</span>
          </div>
          <table className="at-tbl">
            <thead>
              <tr>
                <th>Checkpoint</th>
                <th>Location</th>
                <th>Recorded Vol</th>
                <th>Variance</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_CHECKPOINTS.map((cp) => (
                <tr key={cp.id} className={cp.status === 'ANOMALY' ? 'at-alert-row' : ''}>
                  <td>
                    <div className="at-chk">
                      <span className={`at-chk-name ${cp.status === 'ANOMALY' ? 'alrt' : ''}`}>{cp.name}</span>
                      <span className="at-chk-time">{cp.time}</span>
                    </div>
                  </td>
                  <td>{cp.location}</td>
                  <td className="at-vol">{cp.volume}</td>
                  <td className={`at-var ${cp.status === 'ANOMALY' ? 'bad' : 'ok'}`}>{cp.variance}</td>
                  <td>
                    <span className={`badge-custom ${
                      cp.status === 'VERIFIED' ? 'b-route' : 
                      cp.status === 'ANOMALY' ? 'b-alert' : 'b-sub'
                    }`} style={{ padding: '4px 10px', fontSize: '9px' }}>
                      {cp.status}
                    </span>
                  </td>
                  <td>
                    {cp.status === 'PENDING' ? (
                      <button className="bg-slate-900 text-white text-[9px] font-bold px-4 py-2 uppercase tracking-widest hover:bg-blue-600 transition-all">
                        Verify Now
                      </button>
                    ) : (
                      <CheckCircle2 className={`w-4 h-4 ${cp.status === 'VERIFIED' ? 'text-emerald-500' : 'text-rose-500'}`} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="anomaly-box mt-8" style={{ border: '1px solid var(--br)', borderRadius: '12px' }}>
          <div className="ab-row1 flex items-center gap-3">
            <Activity className="w-4 h-4 text-rose-500" />
            <span className="ab-id">Real-time Chain Integrity Check</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 uppercase tracking-wider">
            All checkpoints are verified by local terminal operators and cross-referenced with Kwala Network smart contracts for volume consistency.
          </p>
        </div>
      </div>
    </div>
  );
}
