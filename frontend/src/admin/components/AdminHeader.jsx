import { useNavigate } from 'react-router-dom';
import StyledButton from '../../components/StyledButton';
import DarkModeToggle from '../../components/DarkModeToggle';
import { useAuth } from '../../components/AuthContext';

export default function AdminHeader() {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className='flex items-center justify-between px-6 py-4 bg-[#DBE2EF] dark:bg-gray-800 text-black dark:text-white shadow-md transition-colors'>
      <h1 className='text-xl font-bold'>NovaSpeech Admin Panel</h1>

      <div className='flex gap-4 items-center'>
        <StyledButton
          onClick={() => navigate('/admin/profile')}
          style={{ fontSize: '14px', padding: '8px 16px' }}
        >
          Profilim
        </StyledButton>
        <StyledButton
          onClick={handleLogout}
          style={{ fontSize: '14px', padding: '8px 16px' }}
        >
          Çıkış Yap
        </StyledButton>
        <DarkModeToggle />
      </div>
    </header>
  );
}
