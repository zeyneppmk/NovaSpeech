import { useState, useEffect } from 'react';
import StyledButton from '../../components/StyledButton';
import { toast } from 'react-hot-toast';
import {
  fetchBlogs,
  createBlog,
  updateBlog,
  deleteBlog as deleteBlogRequest,
} from '../services/adminApi';

export default function BlogManager() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs()
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error('Blogları çekerken hata oluştu:', err));
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    toast(
      (t) => (
        <span>
          Bu blog yazısını silmek istediğinize emin misiniz?
          <div className='mt-2 flex justify-end gap-2'>
            <button
              className='px-3 py-1 bg-red-600 text-white rounded'
              onClick={() => {
                deleteBlogRequest(id)
                  .then(() => {
                    setBlogs((prev) => prev.filter((b) => b.id !== id));
                    toast.success('Blog silindi');
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

  const handleSave = (data) => {
    if (editingBlog) {
      updateBlog(editingBlog.id, data)
        .then((res) => {
          setBlogs((prev) =>
            prev.map((b) => (b.id === editingBlog.id ? res.data : b))
          );
          toast.success('Blog güncellendi.');
        })
        .catch((err) => {
          console.error('Blog güncelleme hatası:', err);
          toast.error('Blog güncellenemedi.');
        });
    } else {
      createBlog(data)
        .then((res) => {
          setBlogs((prev) => [...prev, res.data]);
          toast.success('Blog başarıyla eklendi.');
        })
        .catch((err) => {
          console.error('Blog ekleme hatası:', err);
          toast.error('Blog eklenemedi.');
        });
    }

    setModalOpen(false);
    setEditingBlog(null);
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold'>📝 Blog Yazıları</h2>
        <StyledButton
          onClick={() => {
            setEditingBlog(null);
            setModalOpen(true);
          }}
        >
          ➕ Yeni Blog Ekle
        </StyledButton>
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className='rounded-2xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:shadow-lg transition bg-white dark:bg-gray-800'
          >
            <img
              src={blog.image}
              alt={blog.title}
              className='w-full h-40 object-cover'
            />
            <div className='p-4'>
              <a
                href={blog.link}
                target='_blank'
                rel='noopener noreferrer'
                className='text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline block'
              >
                {blog.title}
              </a>
              <p className='text-gray-600 dark:text-gray-300 text-sm mt-1'>
                {blog.content}
              </p>

              <div className='flex justify-end gap-2 mt-4'>
                <StyledButton
                  onClick={() => handleEdit(blog)}
                  style={{ padding: '8px 16px', fontSize: '14px' }}
                >
                  Düzenle
                </StyledButton>
                <StyledButton
                  onClick={() => handleDelete(blog.id)}
                  className='bg-red-600 hover:bg-red-700 text-white'
                  style={{ padding: '8px 16px', fontSize: '14px' }}
                >
                  Sil
                </StyledButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <BlogFormModal
          onClose={() => {
            setModalOpen(false);
            setEditingBlog(null);
          }}
          onSave={handleSave}
          blog={editingBlog}
        />
      )}
    </div>
  );
}

// Modal bileşeni (isteğe bağlı ayrı dosyaya çıkarılabilir)
function BlogFormModal({ onClose, onSave, blog }) {
  const [form, setForm] = useState({
    title: blog?.title || '',
    content: blog?.content || '',
    link: blog?.link || '',
    image: blog?.image || null, // string olabilir
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
      <div className='bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-lg'>
        <h3 className='text-xl font-bold mb-4'>
          {blog ? '🛠️ Blog Düzenle' : 'Yeni Blog Ekle'}
        </h3>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='text'
            name='title'
            value={form.title}
            onChange={handleChange}
            placeholder='Başlık'
            required
            className='w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700'
          />
          <input
            type='text'
            name='content'
            value={form.content}
            onChange={handleChange}
            placeholder='Kısa Açıklama'
            required
            className='w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700'
          />
          <input
            type='file'
            name='image'
            accept='image/*'
            onChange={(e) =>
              setForm((prev) => ({ ...prev, image: e.target.files[0] }))
            }
            className='w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700'
          />

          <input
            type='text'
            name='link'
            value={form.link}
            onChange={handleChange}
            placeholder='Makale Linki'
            required
            className='w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700'
          />
          <div className='flex justify-end gap-2'>
            <StyledButton type='submit'>
              {blog ? 'Kaydet' : 'Ekle'}
            </StyledButton>
            <StyledButton
              type='button'
              onClick={onClose}
              style={{ borderColor: '#999', color: '#999' }}
            >
              İptal
            </StyledButton>
          </div>
        </form>
      </div>
    </div>
  );
}
