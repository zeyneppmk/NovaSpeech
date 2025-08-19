import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import StyledButton from '../components/StyledButton';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('Lütfen tüm alanları doldurun.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Yeni şifreler eşleşmiyor.');
      return;
    }

    try {
      const res = await axios.put(
        'http://127.0.0.1:8000/api/users/change-password/',
        {
          old_password: oldPassword,
          new_password: newPassword,
          new_password2: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );

      toast.success(res.data.detail || 'Şifre başarıyla değiştirildi.');
      navigate('/profile');
    } catch (error) {
      const err = error.response?.data;
      if (err?.old_password) {
        toast.error(err.old_password[0]);
      } else if (err?.new_password) {
        toast.error(err.new_password[0]);
      } else {
        toast.error('Şifre değiştirilemedi.');
      }
    }
  };

  return (
    <div className='min-h-screen flex items-start justify-center bg-gray-100 dark:bg-[#0f172a] px-4 pt-32 pb-32'>
      <form
        onSubmit={handleSubmit}
        className='bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md w-full max-w-md space-y-6'
      >
        <h2 className='text-2xl font-bold text-center text-gray-800 dark:text-white'>
          🔐 Şifrenizi Değiştirin
        </h2>

        {/* Eski Şifre */}
        <div>
          <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
            Eski Şifre
          </label>
          <div className='flex items-center border rounded-md mt-1 px-3 py-2 bg-gray-50 dark:bg-gray-700'>
            <FaLock className='text-gray-500 mr-2' />
            <input
              type={showOld ? 'text' : 'password'}
              value={oldPassword}
              placeholder='Eski şifre'
              onChange={(e) => setOldPassword(e.target.value)}
              className='w-full bg-transparent outline-none text-black dark:text-white placeholder-gray-400'
            />
            <button
              type='button'
              onClick={() => setShowOld((prev) => !prev)}
              className='ml-2 text-gray-500 dark:text-gray-300'
            >
              {showOld ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Yeni Şifre */}
        <div>
          <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
            Yeni Şifre
          </label>
          <div className='flex items-center border rounded-md mt-1 px-3 py-2 bg-gray-50 dark:bg-gray-700'>
            <FaLock className='text-gray-500 mr-2' />
            <input
              type={showNew ? 'text' : 'password'}
              value={newPassword}
              placeholder='Yeni şifre'
              onChange={(e) => setNewPassword(e.target.value)}
              className='w-full bg-transparent outline-none text-black dark:text-white placeholder-gray-400'
            />
            <button
              type='button'
              onClick={() => setShowNew((prev) => !prev)}
              className='ml-2 text-gray-500 dark:text-gray-300'
            >
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Yeni Şifre (Tekrar) */}
        <div>
          <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
            Yeni Şifre (Tekrar)
          </label>
          <div className='flex items-center border rounded-md mt-1 px-3 py-2 bg-gray-50 dark:bg-gray-700'>
            <FaLock className='text-gray-500 mr-2' />
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              placeholder='Yeni şifre (tekrar)'
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='w-full bg-transparent outline-none text-black dark:text-white placeholder-gray-400'
            />
            <button
              type='button'
              onClick={() => setShowConfirm((prev) => !prev)}
              className='ml-2 text-gray-500 dark:text-gray-300'
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <StyledButton type='submit' className='w-full justify-center'>
          Kaydet
        </StyledButton>
      </form>
    </div>
  );
}
