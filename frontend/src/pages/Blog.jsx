import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/contents/blogs/public/')
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error('Blogları çekerken hata oluştu:', err));
  }, [blogs]);

  return (
    <div className='pt-24 min-h-screen bg-gray-50 dark:bg-gray-900 px-6 pb-32'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white'>
          NovaSpeech Blog
        </h1>

        <div className='grid gap-12 sm:grid-cols-2 lg:grid-cols-3'>
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className='rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(59,130,246,0.3)] dark:shadow-[0_10px_30px_rgba(59,130,246,0.6)] hover:scale-105 transition-all duration-300'
            >
              <a href={blog.link} target='_blank' rel='noopener noreferrer'>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className='w-full h-52 object-cover hover:opacity-90 transition'
                />
              </a>
              <div className='bg-white dark:bg-gray-800 p-6 text-center h-[220px] flex flex-col justify-between'>
                <a href={blog.link} target='_blank' rel='noopener noreferrer'>
                  <h3 className='text-xl font-bold mb-2 text-gray-900 dark:text-white hover:underline'>
                    {blog.title}
                  </h3>
                </a>
                <p className='text-gray-700 dark:text-gray-300 text-sm leading-relaxed'>
                  {blog.content?.substring(0, 120)}...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
