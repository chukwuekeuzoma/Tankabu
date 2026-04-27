import { useNavigate, useLocation } from 'react-router-dom';

export function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isDone = (path: string) => {
    const order = ['/', '/dashboard', '/shipment', '/alert', '/investigate', '/escalate'];
    const currentIdx = order.findIndex(p => location.pathname.startsWith(p) && p !== '/' ? true : location.pathname === p);
    const pathIdx = order.findIndex(p => path.startsWith(p) && p !== '/' ? true : path === p);
    return pathIdx < currentIdx && currentIdx !== -1 && pathIdx !== -1;
  };

  const tabs = [
    { name: 'Sign In', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'SHP-2847', path: '/shipment/2847' },
    { name: 'Alert Fires', path: '/alert' },
    { name: 'Investigate', path: '/investigate' },
    { name: 'Escalate', path: '/escalate' },
  ];

  const handleNext = () => {
    const currentIndex = tabs.findIndex(t => location.pathname.startsWith(t.path) && t.path !== '/' ? true : location.pathname === t.path);
    if (currentIndex >= 0 && currentIndex < tabs.length - 1) {
      navigate(tabs[currentIndex + 1].path);
    }
  };

  return (
    <nav className="topnav">
      <div className="tn-brand">
        <div className="tn-mark">
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <path d="M2 13L9 4L16 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="6" y="13" width="6" height="3" rx="1" fill="white" />
          </svg>
        </div>
        <span className="tn-name">Tankabu</span>
      </div>
      <div className="tn-pills">
        {tabs.map((tab) => {
          const active = isActive(tab.path) || (tab.path !== '/' && location.pathname.startsWith(tab.path));
          const done = !active && isDone(tab.path);
          return (
            <button
              key={tab.path}
              className={`tp ${active ? 'on' : ''} ${done ? 'done' : ''}`}
              onClick={() => navigate(tab.path)}
            >
              {tab.name}
            </button>
          );
        })}
      </div>
      <button className="tn-next" onClick={handleNext}>
        Next
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </nav>
  );
}
