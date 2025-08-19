import { useRef } from 'react';
import { FaCloudUploadAlt, FaFileAlt, FaTrash } from 'react-icons/fa';

export default function UploadBox({ file, onFileSelect, onFileRemove }) {
  const fileInputRef = useRef();

  return (
    <div className='bg-[#e6ebf5] dark:bg-[#1e293b] p-4 rounded-2xl shadow-xl w-72 mx-auto flex flex-col items-center gap-4'>
      {/* Üst alan: Yükleme kutusu */}
      <div
        onClick={() => fileInputRef.current.click()}
        className='border-2 border-dashed border-blue-500 w-full h-40 flex flex-col items-center justify-center rounded-lg cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-700 transition'
      >
        <FaCloudUploadAlt className='text-4xl text-gray-700 dark:text-gray-300 mb-2' />
        <p className='text-gray-800 dark:text-white text-sm font-medium'>
          Ses dosyasını seçmek için tıklayın
        </p>
      </div>

      {/* Alt alan: Dosya adı + silme */}
      <div className='bg-white dark:bg-slate-600 w-full rounded-lg px-3 py-2 flex items-center justify-between'>
        <div className='flex items-center gap-2 text-sm text-gray-800 dark:text-white'>
          <FaFileAlt />
          <span className='truncate w-40'>
            {file ? file.name : 'Ses dosya seçilmedi'}
          </span>
        </div>
        {file && (
          <FaTrash
            onClick={onFileRemove}
            className='cursor-pointer text-red-600 hover:text-red-800 transition'
          />
        )}
      </div>

      {/* Gizli input alanı */}
      <input
        type='file'
        ref={fileInputRef}
        onChange={(e) => onFileSelect(e.target.files[0])}
        accept='audio/*'
        className='hidden'
      />
    </div>
  );
}
