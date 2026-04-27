import { Outlet, useLocation } from 'react-router-dom';
import { TopNav } from '@/components/layout/TopNav';
import { SubNav } from '@/components/layout/SubNav';

export function MainLayout() {
  const location = useLocation();

  return (
    <>
      <TopNav />
      <SubNav />
      <div className="wrap">
        <div className="screen active fade-in">
          <Outlet />
        </div>
      </div>
    </>
  );
}
