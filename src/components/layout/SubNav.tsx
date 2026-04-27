export function SubNav() {
  return (
    <div className="subnav" style={{ padding: '0 40px', height: '52px', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--br)', background: 'var(--bg2)' }}>
      <div className="sn-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E', marginRight: '12px', boxShadow: '0 0 8px rgba(34, 197, 94, 0.4)' }}></div>
      <span className="sn-txt" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--tx2)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Operator Dashboard</span>
      <span className="sn-sep" style={{ margin: '0 16px', color: 'var(--br2)', opacity: 0.5 }}>—</span>
      <span className="sn-txt" style={{ fontSize: '12px', fontWeight: 500, color: 'var(--tx3)' }}>Web Node v2.4.0</span>
    </div>
  );
}
