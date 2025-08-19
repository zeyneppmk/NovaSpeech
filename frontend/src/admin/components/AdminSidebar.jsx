import { NavLink } from 'react-router-dom';

export default function AdminSidebar() {
  const linkClass =
    'block py-2 px-4 rounded-lg hover:bg-[#3F72AF] hover:text-white transition font-medium';

  const activeClass = 'bg-[#3F72AF] text-white';

  return (
    <nav className='space-y-2'>
      <NavLink
        to='/admin/blogs'
        className={({ isActive }) =>
          isActive ? `${linkClass} ${activeClass}` : linkClass
        }
      >
        📝 Blog Yazıları
      </NavLink>

      <NavLink
        to='/admin/users'
        className={({ isActive }) =>
          isActive ? `${linkClass} ${activeClass}` : linkClass
        }
      >
        👥 Kullanıcılar
      </NavLink>

      <NavLink
        to='/admin/home'
        className={({ isActive }) =>
          isActive ? `${linkClass} ${activeClass}` : linkClass
        }
      >
        🖼️ Ana Sayfa Yönetimi
      </NavLink>

      <NavLink
        to='/admin/transcribe'
        className={({ isActive }) =>
          isActive ? `${linkClass} ${activeClass}` : linkClass
        }
      >
        🖼️ Transkriptler
      </NavLink>

      <NavLink
        to='/admin'
        className={({ isActive }) =>
          isActive ? `${linkClass} ${activeClass}` : linkClass
        }
      >
        🖼️ Genel Bakış
      </NavLink>
    </nav>
  );
}
