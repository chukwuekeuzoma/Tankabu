import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Dashboard } from '../pages/Dashboard';
import { Dispatcher } from '../pages/Dispatcher';
import { Checkpoints } from '../pages/Checkpoints';
import { Station } from '../pages/Station';
import { Driver } from '../pages/Driver';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dispatcher" element={<Dispatcher />} />
        <Route path="/checkpoints" element={<Checkpoints />} />
        <Route path="/station" element={<Station />} />
        <Route path="/driver" element={<Driver />} />
      </Route>
    </Routes>
  );
}
