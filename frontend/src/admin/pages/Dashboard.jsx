import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [fileCount, setFileCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');

    //kullanıcı sayısı
    const fetchUserCount = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const res = await axios.get('http://localhost:8000/api/users/count/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserCount(res.data.count);
      } catch (err) {
        console.error('Kullanıcı sayısı alınamadı:', err);
      }
    };

    fetchUserCount();

    // Blog yazısı sayısı
    axios
      .get('http://127.0.0.1:8000/api/contents/blogs/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBlogCount(res.data.length))
      .catch((err) => console.error('Bloglar alınamadı:', err));

    // Yüklenen dosya sayısı
    axios
      .get('http://127.0.0.1:8000/api/transcribe/admin-processed-files/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setFileCount(res.data.length))
      .catch((err) => console.error('Dosyalar alınamadı:', err));
  }, []);

  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold mb-8'>📊 Admin Paneli - Genel Bakış</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
        <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow'>
          <p className='text-sm text-gray-500 mb-2'>👥 Kullanıcı Sayısı</p>
          <p className='text-3xl font-bold'>{userCount}</p>
        </div>
        <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow'>
          <p className='text-sm text-gray-500 mb-2'>📝 Blog Yazısı</p>
          <p className='text-3xl font-bold'>{blogCount}</p>
        </div>
        <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow'>
          <p className='text-sm text-gray-500 mb-2'>📁 Yüklenen Dosya</p>
          <p className='text-3xl font-bold'>{fileCount}</p>
        </div>
      </div>
    </div>
  );
}
