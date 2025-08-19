import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaApple } from 'react-icons/fa';
import { useAuth } from '../../components/AuthContext';
import StyledButton from '../../components/StyledButton';
import axios from 'axios';
import PasswordInput from '../../components/PasswordInput';
import { toast } from 'react-hot-toast';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error('Lütfen kullanıcı adı ve şifre alanlarını doldurun.');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/users/token/',
        { username, password }
      );

      const { access, refresh } = response.data;

      const profileRes = await axios.get(
        'http://127.0.0.1:8000/api/users/profile/',
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const userData = profileRes.data;

      login(userData, access, refresh);

      toast.success(`👋 Hoş geldin, ${userData.username}!`, {
        duration: 4000,
      });

      if (userData.is_staff) {
        navigate('/admin');
      } else {
        navigate('/test');
      }
    } catch (err) {
      console.error('Giriş başarısız:', err);
      toast.error('❌ Hatalı kullanıcı adı veya şifre');
    }
  };
  return (
    <div className='min-h-screen flex items-center justify-center bg-white dark:bg-[#0f172a] pt-24'>
      <div className='w-full max-w-sm p-6 bg-white dark:bg-slate-800 shadow-md rounded-xl border border-gray-200 dark:border-gray-700'>
        <p className='text-2xl font-bold text-center mb-6 text-black dark:text-white'>
          Tekrar hoş geldiniz
        </p>

        <form className='space-y-4' onSubmit={handleLogin}>
          <input
            type='text'
            name='username'
            placeholder='Kullanıcı Adı'
            autoComplete='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full px-4 py-2 border rounded-full bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500'
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Şifre'
            autoComplete='current-password'
          />

          <div className='text-right text-sm'>
            <span className='text-blue-600 hover:underline cursor-pointer'>
              Şifremi unuttum
            </span>
          </div>

          <div className='flex justify-center'>
            <StyledButton type='submit' style={{ width: '125px' }}>
              Giriş Yap
            </StyledButton>
          </div>
        </form>

        <p className='text-sm text-center text-gray-700 dark:text-gray-300 mt-4'>
          Hesabınız yok mu?{' '}
          <span
            className='text-blue-600 hover:underline cursor-pointer ml-1'
            onClick={() => navigate('/register')}
          >
            Üye Ol
          </span>
        </p>

        <div className='mt-6 space-y-3'>
          <button className='w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-full'>
            <FaApple className='text-xl' />
            <span>Apple ile Giriş Yap</span>
          </button>

          <button className='w-full flex items-center justify-center gap-2 border py-2 rounded-full'>
            <img
              src='https://www.svgrepo.com/show/355037/google.svg'
              alt='Google'
              className='w-5 h-5'
            />
            <span>Google ile Giriş Yap</span>
          </button>
        </div>
      </div>
    </div>
  );
}
