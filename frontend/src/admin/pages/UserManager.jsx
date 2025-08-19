import { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { fetchUsers, deleteUser } from '../services/adminApi';
import { useAuth } from '../../components/AuthContext';
import { toast } from 'react-hot-toast';

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const { user } = useAuth(); // Giriş yapan kullanıcı (admin vs.)

  useEffect(() => {
    fetchUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Kullanıcıları çekme hatası:', err));
  }, []);

  const handleDelete = (id) => {
    toast(
      (t) => (
        <span>
          Bu kullanıcıyı silmek istediğinize emin misiniz?
          <div className='mt-2 flex justify-end gap-2'>
            <button
              className='px-3 py-1 bg-red-600 text-white rounded'
              onClick={() => {
                deleteUser(id)
                  .then(() => {
                    setUsers((prev) => prev.filter((u) => u.id !== id));
                    toast.success('Kullanıcı silindi.');
                  })
                  .catch(() => toast.error('Silme işlemi başarısız oldu.'));
                toast.dismiss(t.id);
              }}
            >
              Evet
            </button>
            <button
              className='px-3 py-1 bg-gray-300 text-black rounded'
              onClick={() => toast.dismiss(t.id)}
            >
              Hayır
            </button>
          </div>
        </span>
      ),
      { duration: 10000 }
    );
  };

  return (
    <div className='p-6'>
      <h2 className='text-3xl font-bold mb-8'>👥 Kullanıcı Yönetimi</h2>

      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white dark:bg-gray-800 rounded-xl shadow-md'>
          <thead>
            <tr className='text-left border-b dark:border-gray-700'>
              <th className='px-6 py-4'>#</th>
              <th className='px-6 py-4'>Kullanıcı Adı</th>
              <th className='px-6 py-4'>Ad Soyad</th>
              <th className='px-6 py-4'>E-posta</th>
              <th className='px-6 py-4'>Yetkiler</th>
              <th className='px-6 py-4'>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {users.map((userItem, index) => (
              <tr
                key={userItem.id}
                className='hover:bg-gray-100 dark:hover:bg-gray-700 transition'
              >
                <td className='px-6 py-4'>{index + 1}</td>
                <td className='px-6 py-4'>{userItem.username}</td>
                <td className='px-6 py-4'>
                  {`${userItem.first_name || ''} ${userItem.last_name || ''}`.trim() ||
                    '—'}
                </td>
                <td className='px-6 py-4'>{userItem.email}</td>
                <td className='px-6 py-4'>
                  {userItem.is_superuser
                    ? 'Süper Admin'
                    : userItem.is_staff
                      ? 'Admin'
                      : 'Kullanıcı'}
                </td>
                <td className='px-6 py-4'>
                  {user?.is_staff && !userItem.is_superuser && (
                    <button
                      onClick={() => handleDelete(userItem.id)}
                      className='text-red-600 hover:text-red-800 transition'
                      title='Kullanıcıyı Sil'
                    >
                      <FaTrashAlt />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td
                  colSpan='6'
                  className='px-6 py-4 text-center text-gray-500 dark:text-gray-400'
                >
                  Hiç kullanıcı bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
