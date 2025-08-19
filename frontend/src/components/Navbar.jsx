import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import DarkModeToggle from './DarkModeToggle';
import beyazLogo from '../assets/beyaz_logo.png';
import siyahLogo from '../assets/siyah_logo.png';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from './AuthContext';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      setShowDropdown(true);
      const timeout = setTimeout(() => {
        setShowDropdown(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='fixed top-4 left-0 w-full z-50 flex justify-center pointer-events-none'>
      <div className='bg-[#F9F7F7]/40 dark:bg-gray-800/40 backdrop-blur-md shadow-md rounded-2xl max-w-screen-xl w-[95%] px-6 py-3 flex items-center justify-start gap-8 pointer-events-auto'>
        {/* Logo + Menü grubu */}
        <div className='flex items-center space-x-10 flex-grow'>
          <Link
            to='/'
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className='flex items-center'
          >
            <img
              src={isDarkMode ? siyahLogo : beyazLogo}
              alt='Logo'
              className='h-12 w-auto'
            />
          </Link>

          {/* Menü */}
          <div className='hidden md:flex space-x-6 text-[15px] font-semibold text-[#112D4E] dark:text-white'>
            <Link
              to='/'
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className='hover:opacity-80 transition'
            >
              Ana Sayfa
            </Link>
            <Link
              to='/services'
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className='hover:opacity-80 transition'
            >
              Hizmetler
            </Link>
            <Link
              to='/blog'
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className='hover:opacity-80 transition'
            >
              Blog
            </Link>
          </div>
        </div>

        {/* Sağ Auth Alanı */}
        <div className='flex items-center space-x-4 text-sm ml-auto'>
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  if (window.location.pathname === '/login') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    navigate('/login');
                  }
                }}
                className='px-4 py-2 text-[#112D4E] dark:text-white hover:opacity-80 transition font-semibold'
              >
                Giriş Yap
              </button>

              <button
                onClick={() => {
                  if (window.location.pathname === '/register') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    navigate('/register');
                  }
                }}
                className='px-4 py-2 bg-black text-white rounded-xl hover:opacity-90 transition font-semibold'
              >
                Üye Ol
              </button>
            </>
          ) : (
            <div className='relative' ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className='text-2xl text-[#112D4E] dark:text-white hover:opacity-80 transition'
              >
                <FaUserCircle />
              </button>
              {showDropdown && (
                <div className='absolute right-0 mt-2 w-44 bg-[#F9F7F7] dark:bg-gray-700 shadow rounded z-10'>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate('/profile');
                      setTimeout(
                        () => window.scrollTo({ top: 0, behavior: 'smooth' }),
                        100
                      );
                    }}
                    className='block w-full text-left px-4 py-2 text-[#112D4E] dark:text-white hover:bg-[#DBE2EF] dark:hover:bg-gray-600 text-sm'
                  >
                    👤 Profil
                  </button>
                  <button
                    onClick={handleLogout}
                    className='block w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-[#DBE2EF] dark:hover:bg-gray-600 text-sm'
                  >
                    🚪 Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          )}
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
}
