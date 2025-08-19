import { useNavigate } from 'react-router-dom';
import banner from '../assets/services.png';
import transkripsiyonImg from '../assets/transkripsiyon.png';
import summaryImg from '../assets/özetleme.png';
import StyledButton from '../components/StyledButton';

const isAuthenticated = () => {
  return localStorage.getItem('accessToken') !== null; // ✅ accessToken kontrol ediliyor
};

export default function Services() {
  const navigate = useNavigate();

  const handleTryNow = () => {
    if (isAuthenticated()) {
      navigate('/test');
    } else {
      navigate('/login');
    }
  };

  const services = [
    {
      title: '🔤 Transkripsiyon',
      description:
        'Ses dosyalarınızı metne dönüştürün. Toplantılar, görüşmeler ve röportajlar için mükemmel çözüm.',
      image: transkripsiyonImg,
      alt: 'Transkripsiyon',
    },
    {
      title: '🧠 Özetleme',
      description:
        'Uzun konuşmaları kısa, anlamlı ve aksiyon alınabilir özetlere dönüştürün.',
      image: summaryImg,
      alt: 'Özetleme',
    },
  ];

  return (
    <div className='pt-24 min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6'>
      <div className='max-w-5xl mx-auto space-y-12'>
        {/* Banner */}
        <img
          src={banner}
          alt='NovaSpeech Hizmetleri'
          className='rounded-xl shadow-lg w-full max-h-80 object-cover'
        />

        {/* Başlık */}
        <div className='text-center'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-800 dark:text-white'>
            NovaSpeech ile Neler Yapabilirsiniz?
          </h1>
          <p className='text-gray-600 dark:text-gray-300 text-lg mt-2 max-w-2xl mx-auto'>
            Transkripsiyon ve özetleme özelliklerimizle ses verilerinizi anlamlı
            hale getirin.
          </p>
        </div>

        {/* Kartlar */}
        <div className='grid gap-8 md:grid-cols-2'>
          {services.map(({ title, description, image, alt }, index) => (
            <div
              key={index}
              className='rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(59,130,246,0.3)] dark:shadow-[0_10px_30px_rgba(59,130,246,0.6)] transition'
            >
              <img src={image} alt={alt} className='w-full h-52 object-cover' />
              <div className='bg-white dark:bg-gray-800 p-6 text-center'>
                <h3 className='text-xl font-bold mb-2 text-gray-900 dark:text-white'>
                  {title}
                </h3>
                <p className='text-gray-700 dark:text-gray-300'>
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mor Buton */}
        <div className='pt-8 text-center'>
          <StyledButton onClick={handleTryNow}>🚀 Şimdi Dene</StyledButton>
        </div>
      </div>
    </div>
  );
}
