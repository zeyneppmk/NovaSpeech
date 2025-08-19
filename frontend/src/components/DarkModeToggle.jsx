// src/components/DarkModeToggle.jsx
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark =
      savedTheme === 'dark' ||
      (!savedTheme &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (prefersDark) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggle = () => {
    const html = document.documentElement;
    const newTheme = isDark ? 'light' : 'dark';

    if (newTheme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    localStorage.setItem('theme', newTheme);
    setIsDark(newTheme === 'dark');
  };

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300
        ${isDark ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-white'} 
        hover:scale-105 shadow-md`}
      title={isDark ? 'Açık moda geç' : 'Karanlık moda geç'}
    >
      {isDark ? <FaSun className='text-xl' /> : <FaMoon className='text-xl' />}
      <span className='text-sm font-semibold'>
        {isDark ? 'Açık Mod' : 'Karanlık Mod'}
      </span>
    </button>
  );
}
