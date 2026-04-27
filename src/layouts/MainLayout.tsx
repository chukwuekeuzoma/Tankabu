import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { TopNav } from '@/components/layout/TopNav';
import { SubNav } from '@/components/layout/SubNav';

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === '.') {
        const tabs = ['/', '/dashboard', '/shipment/2847', '/alert', '/investigate', '/escalate'];
        const currentIndex = tabs.findIndex(t => location.pathname.startsWith(t) && t !== '/' ? true : location.pathname === t);
        if (currentIndex >= 0 && currentIndex < tabs.length - 1) {
          navigate(tabs[currentIndex + 1]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, location]);

  return (
    <>
      <TopNav />
      <SubNav />
      <div className="wrap">
        <div className="screen active fade-in" style={{ padding: location.pathname === '/' || location.pathname === '/dashboard' || location.pathname === '/alert' ? 0 : undefined }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
