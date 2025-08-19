import { Outlet } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';

export default function AdminLayout() {
  return (
    <div className='min-h-screen flex flex-col'>
      {/* Üst bar */}
      <AdminHeader /> {/* ✅ Çıkış butonunu burada render ediyoruz */}
      <div className='flex flex-1'>
        {/* Sol menü */}
        <aside className='w-64 bg-[#DBE2EF] dark:bg-gray-800 p-4 hidden md:block'>
          <AdminSidebar />
        </aside>

        {/* Sayfa içeriği */}
        <main className='flex-1 p-6 bg-white dark:bg-gray-900 text-black dark:text-white'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
