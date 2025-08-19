import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function TranscribeManager() {
  const [records, setRecords] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const response = await axios.get(
          'http://127.0.0.1:8000/api/transcribe/admin-processed-files/',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRecords(response.data);
      } catch (error) {
        console.error('Veriler alınamadı:', error);
        toast.error('Veriler alınırken bir hata oluştu.');
      }
    };

    fetchData();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-4'>Transkript İşlemleri</h2>

      {records.length === 0 ? (
        <p className='text-center text-gray-500 italic mt-8'>
          Görüntülenecek herhangi bir transkript işlemi bulunmamaktadır.
        </p>
      ) : (
        records.map((file) => (
          <div
            key={file.id}
            className='border p-4 rounded mb-4 bg-white dark:bg-gray-800 shadow-sm'
          >
            <div className='flex justify-between items-center'>
              <div>
                <p className='font-semibold text-lg'>{file.filename}</p>
                <p className='text-sm text-gray-500'>
                  Kullanıcı: <strong>{file.user}</strong>
                </p>
                <p className='text-sm text-gray-500'>
                  {new Date(file.uploaded_at).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => toggleExpand(file.id)}
                className='px-4 py-2 rounded font-semibold text-sm 
             bg-white text-black 
             dark:bg-gray-700 dark:text-white 
             hover:bg-gray-100 dark:hover:bg-gray-600 
             border border-gray-300 dark:border-gray-600 
             transition-colors duration-200'
              >
                {expandedId === file.id ? 'Gizle' : 'Detay'}
              </button>
            </div>

            {expandedId === file.id && (
              <div className='mt-4'>
                <h4 className='font-semibold mb-2'>Özet</h4>
                <p className='text-yellow-700 dark:text-yellow-400 mb-3'>
                  {file.summary?.summary_text || 'Gizli içerik'}
                </p>

                <h4 className='font-semibold mb-2'>Konuşma Segmentleri</h4>
                <ul className='list-disc pl-6 space-y-1 text-sm'>
                  {file.segments.map((seg, index) => (
                    <li key={index}>
                      <strong>
                        ({parseFloat(seg.start_time).toFixed(2)}s -{' '}
                        {parseFloat(seg.end_time).toFixed(2)}s)
                      </strong>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
