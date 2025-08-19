import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import {
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaLinkedin,
} from 'react-icons/fa6';

export default function Footer() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  // Tüm yönlendirmelerde en üste scroll
  const goTo = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Özellikler tıklandığında ne yapılacak?
  const handleFeatureClick = () => {
    if (isLoggedIn) {
      goTo('/services');
    } else {
      goTo('/login');
    }
  };

  return (
    <footer className='bg-[#0B1F3A] text-white py-16 px-6'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10'>
        {/* Sol: Logo + açıklama + sosyal medya */}
        <div className='space-y-4'>
          <img
            src='/logo.png'
            alt='NovaSpeech Logo'
            className='w-32 hover:opacity-80 transition cursor-pointer'
            onClick={() => goTo('/')}
          />
          <p className='text-sm text-gray-400'>
            Güçlü ses teknolojileri için yeni nesil platform.
          </p>
          <div className='flex space-x-4 text-2xl mt-4 text-white'>
            <a
              href='https://www.instagram.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaInstagram />
            </a>
            <a
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaXTwitter />
            </a>
            <a
              href='https://www.linkedin.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaLinkedin />
            </a>
            <a
              href='https://www.youtube.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Sağ: Menü başlıkları */}
        <div className='md:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm'>
          <div>
            <h4 className='font-semibold mb-3 text-gray-300 uppercase'>
              Özellikler
            </h4>
            <ul className='space-y-2 text-gray-400'>
              <li>
                <button
                  onClick={handleFeatureClick}
                  className='hover:text-white transition'
                >
                  Transkripsiyon
                </button>
              </li>
              <li>
                <button
                  onClick={handleFeatureClick}
                  className='hover:text-white transition'
                >
                  Özetleme
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-semibold mb-3 text-gray-300 uppercase'>
              Kaynaklar
            </h4>
            <ul className='space-y-2 text-gray-400'>
              <li>
                <a
                  href='#'
                  onClick={(e) => e.preventDefault()}
                  className='hover:text-white transition'
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href='#'
                  onClick={(e) => e.preventDefault()}
                  className='hover:text-white transition'
                >
                  Dokümantasyon
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-semibold mb-3 text-gray-300 uppercase'>
              Şirket
            </h4>
            <ul className='space-y-2 text-gray-400'>
              <li>
                <a
                  href='#'
                  onClick={(e) => e.preventDefault()}
                  className='hover:text-white transition'
                >
                  Hakkımızda
                </a>
              </li>
              <li>
                <a
                  href='#'
                  onClick={(e) => e.preventDefault()}
                  className='hover:text-white transition'
                >
                  Gizlilik
                </a>
              </li>
              <li>
                <a
                  href='#'
                  onClick={(e) => e.preventDefault()}
                  className='hover:text-white transition'
                >
                  Şartlar
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Alt Telif Hakkı */}
      <div className='mt-12 text-center text-xs text-gray-500'>
        © {new Date().getFullYear()} NovaSpeech. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
