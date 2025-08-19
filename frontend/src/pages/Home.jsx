import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import bg from '../assets/bg8.png';
import StyledButton from '../components/StyledButton';
import axios from 'axios';

export default function Home() {
  const [homeContents, setHomeContents] = useState([]);
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/contents/home/')
      .then((res) => setHomeContents(res.data))
      .catch((err) => console.error('Ana sayfa verileri alınamadı:', err));
  }, [homeContents]);
  const heroContent = homeContents.find((item) => item.type === 'hero');
  const cardContents = homeContents.filter((item) => item.type === 'card');
  const techContents = homeContents.filter((item) => item.type === 'tech');
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate('/test');
    } else {
      navigate('/login');
    }
  };

  if (homeContents.length === 0) {
    return (
      <div className='pt-24 min-h-screen bg-white dark:bg-gray-900 text-black dark:text-black flex items-center justify-center'>
        <p className='text-xl font-semibold'>Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className='pt-24 min-h-screen bg-white dark:bg-gray-900 text-black dark:text-black'>
      {/* Hero Alanı */}
      <div
        className='relative flex flex-col items-center justify-center text-center px-4 h-[500px] md:h-[510px] bg-center bg-no-repeat bg-cover'
        style={{
          backgroundImage: heroContent?.image
            ? `url(http://127.0.0.1:8000${heroContent.image})`
            : `url(${bg})`,
          backgroundPosition: 'center',
        }}
      >
        <h1 className='text-5xl md:text-6xl font-serif font-semibold leading-tight mb-6'>
          {heroContent?.title || 'Sesi daha akıllı hale getirin.'}
        </h1>
        <p className='text-black dark:text-gray-300 text-lg max-w-2xl mb-8'>
          {heroContent?.description ||
            'AI destekli ses transkripsiyonu ve özet aracı.'}
        </p>
        <div className='mt-2'>
          <StyledButton onClick={handleButtonClick}>Şimdi Dene →</StyledButton>
        </div>
      </div>

      {/* Hizmet Kartları */}
      <div className='mt-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
        {cardContents.map((item, index) => (
          <div
            key={index}
            className='rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(59,130,246,0.3)] dark:shadow-[0_10px_30px_rgba(59,130,246,0.6)] hover:scale-105 transition-all duration-300'
          >
            <img
              src={item.image_url}
              alt={item.title}
              className='w-full h-52 object-cover'
            />
            <div className='bg-white dark:bg-gray-800 p-6 text-center'>
              <h3 className='text-xl font-bold mb-2'>{item.title}</h3>
              <p className='text-gray-700 dark:text-gray-300 mb-4'>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-28'></div>

      {/* NovaSpeech Teknolojileri Bölümü */}
      <section className='bg-[#F3F4F6] dark:bg-[#1A1A1A] py-24 px-4'>
        <div className='max-w-6xl mx-auto space-y-20'>
          {techContents.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-10 md:gap-14`}
            >
              {/* Görsel kutusu */}
              <div className='w-full md:w-[40%]'>
                <div className='rounded-2xl overflow-hidden shadow-[0_6px_20px_rgba(59,130,246,0.2)] dark:shadow-[0_6px_20px_rgba(59,130,246,0.4)] transition-all duration-300 hover:scale-105'>
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className='w-full h-64 object-contain bg-white dark:bg-gray-800 p-4'
                  />
                </div>
              </div>

              {/* Yazı alanı */}
              <div className='w-full md:w-[60%]'>
                <h3 className='text-2xl font-semibold mb-3 text-gray-900 dark:text-white'>
                  {item.title}
                </h3>
                <p className='text-gray-700 dark:text-gray-300 text-base leading-relaxed'>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
