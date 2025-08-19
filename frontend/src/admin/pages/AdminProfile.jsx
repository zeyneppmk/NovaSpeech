import React, { useEffect, useState } from 'react';
import { FaUserShield, FaLock } from 'react-icons/fa';
import StyledButton from '../../components/StyledButton';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const res = await axios.get(
          'http://127.0.0.1:8000/api/users/profile/',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAdmin(res.data);
      } catch (error) {
        console.error('Admin bilgileri alınamadı:', error);
        toast.error('Admin bilgileri alınamadı.');
      }
    };
    fetchAdminProfile();
  }, []);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('Lütfen tüm alanları doldurun.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Yeni şifreler uyuşmuyor.');
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
            Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
          },
        }
      );

      toast.success('✅ Şifreniz başarıyla değiştirildi.');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error(err);
      if (err.response?.data?.old_password) {
        toast.error('❌ Eski şifre yanlış.');
      } else if (err.response?.data?.new_password) {
        toast.error(`❌ ${err.response.data.new_password}`);
      } else {
        toast.error('❌ Şifre değiştirilemedi.');
      }
    }
  };

  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold mb-10 flex items-center gap-3'>
        <FaUserShield className='text-purple-600' />
        Admin Profil
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Profil Bilgileri */}
        <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow'>
          <h3 className='text-xl font-semibold mb-4 text-gray-800 dark:text-white'>
            👤 Hesap Bilgileri
          </h3>

          <div className='space-y-2 text-gray-700 dark:text-gray-200'>
            <p>
              <strong>Kullanıcı Adı:</strong> {admin?.username}
            </p>
            <p>
              <strong>E-posta:</strong> {admin?.email}
            </p>
          </div>
        </div>

        {/* Şifre Değiştir */}
        <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow'>
          <h3 className='text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2'>
            <FaLock className='text-purple-600' />
            Şifreyi Değiştir
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleChangePassword();
            }}
          >
            <div className='space-y-4'>
              <input
                type='text'
                name='username'
                autoComplete='username'
                value={admin?.username || ''}
                readOnly
                hidden
              />

              <input
                type='password'
                placeholder='Eski şifreniz'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                autoComplete='current-password'
                className='w-full p-3 border rounded bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400'
              />

              <input
                type='password'
                placeholder='Yeni şifreniz'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete='new-password'
                className='w-full p-3 border rounded bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400'
              />

              <input
                type='password'
                placeholder='Yeni şifre (tekrar)'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete='new-password'
                className='w-full p-3 border rounded bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400'
              />

              <StyledButton type='submit'>Kaydet</StyledButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
