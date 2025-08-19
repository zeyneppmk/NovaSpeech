import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StyledButton from '../../components/StyledButton';
import PasswordInput from '../../components/PasswordInput';
import { toast } from 'react-hot-toast';

export default function Register() {
  const [username, setUsername] = useState('');
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !username ||
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      toast.error('Lütfen tüm alanları doldurun.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Şifreler eşleşmiyor!');
      return;
    }

    const invalidCriteria = passwordCriteria.filter(
      (rule) => !rule.test(password)
    );
    if (invalidCriteria.length > 0) {
      toast.error('Şifreniz belirtilen kriterleri karşılamıyor.');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/users/register/',
        {
          username,
          first_name,
          last_name,
          email,
          password,
          password2: confirmPassword,
        }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success('Kayıt başarılı! Giriş ekranına yönlendiriliyorsunuz.');
        navigate('/login');
      } else {
        toast.error('Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Bu kullanıcı adı veya e-posta zaten kullanılıyor.');
    }
  };

  const passwordCriteria = [
    {
      id: 'length',
      label: 'En az 8 karakter',
      test: (pw) => pw.length >= 8,
    },
    {
      id: 'numeric',
      label: 'En az 1 rakam içermeli',
      test: (pw) => /\d/.test(pw),
    },
    {
      id: 'notCommon',
      label: 'Yaygın bir şifre olmamalı (123456, password vs.)',
      test: (pw) => {
        const common = ['123456', 'password', '12345678', 'qwerty'];
        return !common.includes(pw);
      },
    },
    {
      id: 'notSimilar',
      label: 'Kullanıcı bilgileriyle benzer olmamalı',
      test: (pw) => {
        const lowered = pw.toLowerCase();
        const fields = [username, first_name, last_name, email]
          .filter(Boolean)
          .map((f) => f.toLowerCase());

        return !fields.some(
          (field) => field.length >= 3 && lowered.includes(field)
        );
      },
    },
  ];

  return (
    <div className='min-h-screen bg-white dark:bg-[#0f172a] flex items-center justify-center pt-24 pb-32'>
      <div className='w-full max-w-md p-6 bg-white dark:bg-slate-800 shadow-md rounded-xl'>
        <p className='text-3xl font-bold text-center mb-6 text-black dark:text-white'>
          Hesap Oluştur
        </p>
        <form onSubmit={handleRegister} className='space-y-4'>
          <input
            type='text'
            name='username'
            placeholder='Kullanıcı Adı'
            autoComplete='username' // ✅ Yeni hesap için kullanıcı adı
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full px-4 py-2 border rounded-full bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500'
          />
          <input
            type='text'
            placeholder='Ad'
            value={first_name}
            onChange={(e) => setFirstname(e.target.value)}
            className='w-full px-4 py-2 border rounded-full bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500'
          />
          <input
            type='text'
            placeholder='Soyad'
            value={last_name}
            onChange={(e) => setLastname(e.target.value)}
            className='w-full px-4 py-2 border rounded-full bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500'
          />

          <input
            type='email'
            name='email'
            placeholder='E-posta'
            autoComplete='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-4 py-2 border rounded-full bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500'
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Şifre'
            autoComplete='new-password'
          />

          <PasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Şifreyi Doğrula'
            autoComplete='new-password'
          />

          <div className='mt-2 space-y-1'>
            {password.length > 0 && (
              <div className='mt-2 space-y-1'>
                {passwordCriteria.map((item) => {
                  const passed = item.test(password);
                  return (
                    <div
                      key={item.id}
                      className='flex items-center gap-2 text-sm'
                    >
                      <span
                        className={passed ? 'text-green-600' : 'text-red-500'}
                      >
                        {passed ? '✅' : '❌'}
                      </span>
                      <span
                        className={passed ? 'text-green-700' : 'text-gray-600'}
                      >
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className='flex justify-center'>
            <StyledButton type='submit' style={{ width: '125px' }}>
              Üye Ol
            </StyledButton>
          </div>
        </form>

        <p className='text-sm mt-4 text-gray-600 dark:text-gray-300 text-center'>
          Zaten hesabınız var mı?{' '}
          <span
            onClick={() => navigate('/login')}
            className='text-blue-600 hover:underline cursor-pointer font-medium'
          >
            Giriş Yap
          </span>
        </p>

        <div className='mt-6 space-y-3'>
          <button className='w-full flex items-center justify-center gap-2 border py-2 rounded-full'>
            <img
              src='https://www.svgrepo.com/show/355037/google.svg'
              alt='Google'
              className='w-5 h-5'
            />
            <span>Google ile Üye Ol</span>
          </button>
        </div>
      </div>
    </div>
  );
}
