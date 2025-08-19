import { Routes, Route, Navigate } from 'react-router-dom';
import AdminRoute from './AdminRoute';
import AdminLayout from '../AdminLayout';
import Dashboard from '../pages/Dashboard';
import BlogManager from '../pages/BlogManager';
import UserManager from '../pages/UserManager';
import AdminProfile from '../pages/AdminProfile';
import HomeManager from '../pages/HomeManager';
import TranscribeManager from '../pages/TranscribeManager';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path='blogs' element={<BlogManager />} />
        <Route path='users' element={<UserManager />} />
        <Route path='profile' element={<AdminProfile />} />
        <Route path='*' element={<Navigate to='/' />} />
        <Route path='home' element={<HomeManager />} />
        <Route path='transcribe' element={<TranscribeManager />} />
      </Route>
    </Routes>
  );
}
