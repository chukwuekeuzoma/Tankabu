import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShipments } from '@/context/ShipmentContext';
import { CheckCircle2, ShieldAlert, Clock, History, MapPin, Activity } from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  const { shipments, selectedShipment, selectShipment } = useShipments();
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<any>(null);

  return (
    <>
      {selectedShipment && selectedShipment.status === 'ALERT' && (
        <div className="alert-banner">
          <div className="alert-pulse"></div>
          <span className="ab-label">ACTIVE ALERT</span>
          <span className="ab-txt">
            <b>{selectedShipment.id}</b> — Volume anomaly detected. {selectedShipment.checkpoints.find(c => c.status === 'ANOMALY')?.variance} unaccounted.
          </span>
          <span className="ab-time">13:41</span>
        </div>
      )}

      <div style={{ padding: '0 0 40px' }}>
        <div className="dash-cols">
          {/* Fleet List */}
          <div className="fleet-card">
            <div className="fleet-hd">
              <span className="fleet-title">Active Fleet</span>
              <span className="fleet-count">{shipments.length} trucks active</span>
            </div>
            
            {shipments.map(s => (
              <div 
                key={s.id} 
                className={`fleet-item ${s.status === 'ALERT' ? 'alert-row' : ''} ${selectedShipment?.id === s.id ? 'active-row' : ''}`} 
                onClick={() => {
                  selectShipment(s.id);
                  setSelectedCheckpoint(null);
                }}
                style={{ cursor: 'pointer', borderLeft: selectedShipment?.id === s.id ? '3px solid var(--blue)' : 'none' }}
              >
                <div className="fi-row1">
                  <span className={`fi-id ${s.status === 'ALERT' ? 'alrt' : 'ok'}`}>{s.id}</span>
                  <span className={`badge-custom ${s.status === 'ALERT' ? 'b-alert' : 'b-route'}`}>{s.status.replace('_', ' ')}</span>
                </div>
                <div className="fi-meta">{s.driver} · {s.volume}L<br/>Lagos → {s.station.slice(0, 8)}...</div>
                <div className="fi-prog-wrap">
                  <div className="fi-prog" style={{ width: `${s.progress}%`, background: s.status === 'ALERT' ? 'var(--red)' : 'var(--blue)' }}></div>
                </div>
                <div className="fi-eta">ETA {s.eta}</div>
              </div>
            ))}
          </div>

          {/* Map & Detail */}
          <div className="map-card">
            <div className="map-hd">
              <span className="map-title">Live Route Map — {selectedShipment?.id}</span>
              {selectedShipment?.status === 'ALERT' && (
                <span className="badge-custom b-alert" style={{ animation: 'pulse 1.8s ease infinite' }}>ALERT</span>
              )}
            </div>
            <div className="map-svg-wrap">
              <svg viewBox="0 0 680 190" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', overflow: 'visible' }}>
                <path d="M 68 118 Q 140 82 200 76 Q 270 70 336 82 Q 402 94 456 102 Q 510 110 590 116" stroke="#1C2E42" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                
                {/* Dynamic Progress Path */}
                {selectedShipment && (
                   <path 
                     d="M 68 118 Q 140 82 200 76 Q 270 70 336 82" 
                     stroke={selectedShipment.status === 'ALERT' ? '#EF4444' : '#3B7BF6'} 
                     strokeWidth="2.5" 
                     fill="none" 
                     strokeLinecap="round" 
                     style={{ opacity: selectedShipment.progress > 50 ? 1 : 0.3 }}
                   />
                )}

                {/* Checkpoint Markers */}
                {selectedShipment?.checkpoints.map((cp, idx) => {
                  const coords = [
                    { x: 68, y: 118 },
                    { x: 200, y: 76 },
                    { x: 336, y: 82 },
                    { x: 456, y: 102 },
                    { x: 590, y: 116 }
                  ][idx];
                  
                  return (
                    <g key={cp.id} onClick={() => setSelectedCheckpoint(cp)} style={{ cursor: 'pointer' }}>
                      <circle 
                        cx={coords.x} 
                        cy={coords.y} 
                        r={cp.status === 'ANOMALY' ? 14 : 12} 
                        fill={cp.status === 'VERIFIED' ? '#22C55E' : cp.status === 'ANOMALY' ? '#EF4444' : 'var(--bg2)'} 
                        stroke={cp.status === 'PENDING' ? '#364E68' : '#060D18'} 
                        strokeWidth="2.5" 
                        strokeDasharray={cp.status === 'PENDING' ? "4 3" : "0"}
                        style={{ filter: selectedCheckpoint?.id === cp.id ? 'drop-shadow(0 0 8px var(--blue))' : 'none' }}
                      />
                      {cp.status === 'VERIFIED' && <text x={coords.x} y={coords.y + 5} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">✓</text>}
                      {cp.status === 'ANOMALY' && <text x={coords.x} y={coords.y + 5} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">!</text>}
                      <text x={coords.x} y={coords.y > 100 ? coords.y + 24 : coords.y - 18} textAnchor="middle" fill={cp.status === 'ANOMALY' ? '#EF4444' : '#6A82A0'} fontSize="10" fontWeight={cp.status === 'ANOMALY' ? '700' : '400'}>{cp.location}</text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Event Details Panel (Replaces original Anomaly Box when checkpoint selected) */}
            <div className="anomaly-box" style={{ 
              borderColor: selectedCheckpoint ? 'var(--blue)' : selectedShipment?.status === 'ALERT' ? 'rgba(239,68,68,.3)' : 'var(--br)',
              minHeight: '100px',
              transition: 'all 0.2s ease'
            }}>
              {selectedCheckpoint ? (
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="ab-id" style={{ color: 'var(--tx1)' }}>{selectedCheckpoint.name} — EVENT_LOG</span>
                      <span className={`badge-custom ${selectedCheckpoint.status === 'VERIFIED' ? 'b-route' : selectedCheckpoint.status === 'ANOMALY' ? 'b-alert' : 'b-pending'}`} style={{ padding: '2px 8px', fontSize: '9px' }}>
                        {selectedCheckpoint.status}
                      </span>
                    </div>
                    <p style={{ fontSize: '11px', color: 'var(--tx3)' }}>
                      Location: <b>{selectedCheckpoint.location}</b> · Recorded at: <b>{selectedCheckpoint.time}</b> · Variance: <b style={{ color: selectedCheckpoint.status === 'ANOMALY' ? 'var(--red)' : 'var(--green)' }}>{selectedCheckpoint.variance}</b>
                    </p>
                    <div className="flex gap-4 mt-2">
                       <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Vol: {selectedCheckpoint.volume}</div>
                       <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Tx: 0x{Math.random().toString(16).slice(2, 10)}...</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedCheckpoint(null)}
                    className="text-[10px] font-bold text-blue-500 uppercase tracking-widest hover:underline"
                  >
                    Close Log
                  </button>
                </div>
              ) : selectedShipment ? (
                <>
                  <div className="ab-row1">
                    <span className="ab-id">{selectedShipment.id} — {selectedShipment.status === 'ALERT' ? 'Anomaly at Checkpoint' : 'Operational Status'}</span>
                  </div>
                  {selectedShipment.status === 'ALERT' ? (
                    <>
                      <div className="ab-metrics">
                        Expected: <span>{selectedShipment.volume} L</span> · Recorded: <span className="neg">28,091 L</span> · Δ <span className="neg">−2,847 L (−8.6%)</span>
                      </div>
                      <div className="ab-chain">
                        <span className="ck-tx-lbl">Contract auto-fired · block #4,729,183 · tx: </span>
                        <span className="tx">0xd8e2c495...f102a7b3</span>
                      </div>
                    </>
                  ) : (
                    <div className="ab-metrics" style={{ color: 'var(--tx2)' }}>
                      All checkpoints verified for integrity. System healthy. Click a checkpoint marker to view detailed logs.
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
