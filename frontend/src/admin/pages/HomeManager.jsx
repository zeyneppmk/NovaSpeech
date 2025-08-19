import { useState, useEffect } from 'react';
import axios from 'axios';
import StyledButton from '../../components/StyledButton';
import { toast } from 'react-hot-toast';

export default function HomeManager() {
  const [contents, setContents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'hero',
    image: null,
  });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/contents/home/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContents(res.data);
    } catch (error) {
      console.error('Veri alınamadı:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('type', formData.type);

    if (
      (formData.type === 'card' || formData.type === 'tech') &&
      formData.image
    ) {
      data.append('image', formData.image);
    }

    let toastId = null;
    try {
      toastId = toast.loading(editingId ? 'Güncelleniyor...' : 'Ekleniyor...');

      const url = editingId
        ? `http://127.0.0.1:8000/api/contents/home/${editingId}/`
        : `http://127.0.0.1:8000/api/contents/home/`;

      const method = editingId ? axios.put : axios.post;

      await method(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success(
        editingId ? 'İçerik başarıyla güncellendi.' : 'Yeni içerik eklendi.',
        { id: toastId }
      );

      fetchContents();
      setFormData({ title: '', description: '', type: 'hero', image: null });
      setEditingId(null);
    } catch (error) {
      if (toastId)
        toast.error('İşlem sırasında bir hata oluştu.', { id: toastId });

      // 🔍 Burada hatayı açalım
      console.log('🛑 Hata Detayı:', error.response?.data || error.message);
    }
  };

  const handleEdit = (content) => {
    setEditingId(content.id);
    setFormData({
      title: content.title,
      description: content.description,
      type: content.type,
      image: null,
    });
  };

  const handleDelete = async (id) => {
    toast(
      (t) => (
        <span>
          Bu içeriği silmek istediğinize emin misiniz?
          <div className='mt-2 flex gap-2'>
            <button
              className='bg-red-600 text-white px-3 py-1 rounded'
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await axios.delete(
                    `http://127.0.0.1:8000/api/contents/home/${id}/`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  fetchContents();
                  toast.success('İçerik başarıyla silindi.');
                } catch (error) {
                  console.error('Silme hatası:', error);
                  toast.error('Silme işlemi başarısız oldu.');
                }
              }}
            >
              Evet
            </button>
            <button
              className='bg-gray-300 text-black px-3 py-1 rounded'
              onClick={() => toast.dismiss(t.id)}
            >
              Hayır
            </button>
          </div>
        </span>
      ),
      { duration: 10000 } // 10 saniye boyunca toast gösterilsin
    );
  };

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold mb-6'>Ana Sayfa İçerik Yönetimi</h2>

      <form onSubmit={handleSubmit} className='space-y-4 mb-10'>
        <div>
          <label className='block font-semibold'>Tür:</label>
          <select
            name='type'
            value={formData.type}
            onChange={handleChange}
            className='border p-2 rounded w-full bg-white text-black dark:bg-gray-700 dark:text-white'
          >
            <option value='hero'>Hero</option>
            <option value='card'>Hizmet Kartı</option>
            <option value='tech'>Teknoloji Kartı</option>
          </select>
        </div>

        <div>
          <label className='block font-semibold'>Başlık:</label>
          <input
            name='title'
            value={formData.title}
            onChange={handleChange}
            className='border p-2 rounded w-full bg-white text-black dark:bg-gray-700 dark:text-white'
            required
          />
        </div>

        <div>
          <label className='block font-semibold'>Açıklama:</label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            className='border p-2 rounded w-full bg-white text-black dark:bg-gray-700 dark:text-white'
            rows={3}
            required
          />
        </div>

        {(formData.type === 'card' || formData.type === 'tech') && (
          <div>
            <label className='block font-semibold'>Görsel:</label>
            <input
              type='file'
              name='image'
              accept='image/*'
              onChange={handleChange}
              className='border p-2 rounded w-full bg-white text-black dark:bg-gray-700 dark:text-white'
            />
          </div>
        )}

        <StyledButton type='submit'>
          {editingId ? 'Güncelle' : 'Ekle'}
        </StyledButton>
      </form>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {contents.map((item) => (
          <div
            key={item.id}
            className='p-4 border rounded shadow-md bg-white dark:bg-gray-800'
          >
            <p className='text-sm text-gray-500 mb-1'>{item.type}</p>
            <h3 className='text-lg font-semibold mb-2'>{item.title}</h3>
            <p className='text-gray-700 dark:text-gray-300 mb-2'>
              {item.description}
            </p>
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.title}
                className='w-full h-40 object-cover rounded mb-2'
              />
            )}
            <div className='flex gap-2'>
              <StyledButton onClick={() => handleEdit(item)}>
                Düzenle
              </StyledButton>
              <StyledButton
                onClick={() => handleDelete(item.id)}
                className='bg-red-600 hover:bg-red-700'
              >
                Sil
              </StyledButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
