import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function PasswordInput({
  value,
  onChange,
  placeholder = 'Şifre',
  name,
  autoComplete = 'current-password',
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className='relative'>
      <input
        type={visible ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        autoComplete={autoComplete}
        className='w-full px-4 py-2 border rounded-full bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 pr-10'
      />
      <span
        onClick={() => setVisible(!visible)}
        className='absolute right-3 top-3 cursor-pointer text-gray-500 dark:text-gray-300'
      >
        {visible ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
      </span>
    </div>
  );
}
