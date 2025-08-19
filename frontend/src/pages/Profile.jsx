import { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../components/StyledButton';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Profile() {
  const { user } = useAuth();
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios
        .get('http://127.0.0.1:8000/api/users/history/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
        .then((res) => {
          setHistory(res.data);
        })
        .catch((err) => console.error('Geçmiş verisi alınamadı:', err));
    }
  }, [user]);

  const handleDelete = (id) => {
    toast(
      (t) => (
        <span>
          Bu içeriği silmek istediğinize emin misiniz?
          <div className='mt-2 flex justify-end gap-2'>
            <button
              className='px-3 py-1 bg-red-600 text-white rounded'
              onClick={async () => {
                try {
                  const token = localStorage.getItem('accessToken');
                  const res = await axios.delete(
                    `http://127.0.0.1:8000/api/users/history/${id}/delete/`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );

                  if (res.status === 204) {
                    setHistory((prev) => prev.filter((item) => item.id !== id));
                    toast.success('Kayıt başarıyla silindi');
                  } else {
                    toast.error('Silme işlemi başarısız oldu.');
                  }
                } catch (err) {
                  console.error('Silme hatası:', err);
                  toast.error('Sunucu hatası oluştu.');
                }

                toast.dismiss(t.id); // onay toastını kapat
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
    <div className='min-h-screen pt-28 px-4 sm:px-8 bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-white'>
      <div className='max-w-4xl mx-auto space-y-10'>
        {/* PROFİL KARTI */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8'>
          <h2 className='text-3xl font-bold mb-6'>👤 Hesap Bilgileri</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
                E-posta
              </label>
              <div className='bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 text-lg'>
                {user?.email}
              </div>
              <label className='block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
                Kullanıcı Adı
              </label>
              <div className='bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 text-lg'>
                {user?.username}
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
                Şifre
              </label>
              <div className='bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 text-lg'>
                ********
              </div>
            </div>
          </div>
          <div className='mt-6'>
            <StyledButton onClick={() => navigate('/change-password')}>
              🔁 Şifreyi Değiştir
            </StyledButton>
          </div>
        </div>

        {/* GEÇMİŞİ GÖSTER/GİZLE */}
        <div className='text-center'>
          <StyledButton onClick={() => setShowHistory(!showHistory)}>
            {showHistory ? '📂 Geçmişi Gizle' : '📜 Geçmiş İşlemleri Göster'}
          </StyledButton>
        </div>

        {/* GEÇMİŞ TRANSKRİPTLER */}
        {showHistory && (
          <div className='space-y-6'>
            {history.length === 0 ? (
              <div className='text-center text-gray-500 dark:text-gray-400 italic'>
                Henüz bir transkript geçmişiniz bulunmamaktadır.
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'
                >
                  <div>
                    <p className='text-xl font-semibold'>{item.filename}</p>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      📅 {new Date(item.uploaded_at).toLocaleString()}
                    </p>
                  </div>

                  <div className='flex flex-wrap gap-3 justify-end'>
                    <StyledButton
                      onClick={() =>
                        window.open(item.transcript_pdf_url, '_blank')
                      }
                    >
                      📄 Transkripti Aç
                    </StyledButton>

                    {item.summary_pdf_url && (
                      <StyledButton
                        onClick={() =>
                          window.open(item.summary_pdf_url, '_blank')
                        }
                      >
                        🧠 Özeti Aç
                      </StyledButton>
                    )}

                    <StyledButton
                      className='bg-red-600 hover:bg-red-700 text-white'
                      onClick={() => handleDelete(item.id)}
                    >
                      🗑 Sil
                    </StyledButton>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
