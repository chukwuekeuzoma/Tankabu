
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { SignIn } from '@/pages/SignIn';
import { Dashboard } from '@/pages/Dashboard';
import { ShipmentDetail } from '@/pages/ShipmentDetail';
import { AlertFires } from '@/pages/AlertFires';
import { Investigate } from '@/pages/Investigate';
import { Escalate } from '@/pages/Escalate';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<SignIn />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="shipment/:id" element={<ShipmentDetail />} />
        <Route path="alert" element={<AlertFires />} />
        <Route path="investigate" element={<Investigate />} />
        <Route path="escalate" element={<Escalate />} />
      </Route>
    </Routes>
  );
}
