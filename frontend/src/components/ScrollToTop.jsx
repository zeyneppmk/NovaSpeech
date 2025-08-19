// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Küçük bir gecikme animasyonları bozmamak için
    const scrollTimeout = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 10);

    return () => clearTimeout(scrollTimeout);
  }, [pathname]);

  return null;
}
