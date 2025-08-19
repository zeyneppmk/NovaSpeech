import { useState } from 'react';
import { FaDownload, FaFileAlt, FaBrain } from 'react-icons/fa';
import StyledButton from '../components/StyledButton';
import UploadBox from '../components/UploadBox';
import { toast } from 'react-hot-toast';

export default function Test() {
  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [triedToUpload, setTriedToUpload] = useState(false);

  const handleUpload = async () => {
    setTriedToUpload(true);

    if (!file) {
      toast.error('Lütfen önce bir ses dosyası seçin.');
      return;
    }
    setTranscript('');
    setSummary('');
    setAudioFile(null);
    setLoading(true);

    try {
      const token = localStorage.getItem('accessToken');
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(
        'http://localhost:8000/api/transcribe/upload/',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error('Yükleme başarısız');

      const data = await response.json();
      const segments = data.audio_file.segments || [];

      setAudioFile(data.audio_file);
      setTranscript(segments.map((s) => s.text).join('\n'));
      setSummary(data.audio_file?.summary?.summary_text || 'Özet bulunamadı.');
    } catch (error) {
      console.error('Upload hatası:', error);
      toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleTranscriptDownload = () => {
    if (!audioFile?.transcript_pdf_url) {
      toast.error('Transkript PDF bağlantısı bulunamadı.');
      return;
    }

    window.open(audioFile.transcript_pdf_url, '_blank');
  };

  const handleSummaryDownload = () => {
    if (!audioFile?.summary_pdf_url) {
      toast.error('Özet PDF bağlantısı bulunamadı.');
      return;
    }

    window.open(audioFile.summary_pdf_url, '_blank');
  };

  return (
    <div className='pt-28 pb-20 px-4 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold text-center mb-10 dark:text-white'>
        🎧 Ses Dosyasını Metne Dönüştür
      </h1>

      {/* Özel Dosya Yükleme Kutusu */}
      <UploadBox
        file={file}
        onFileSelect={setFile}
        onFileRemove={() => setFile(null)}
        error={!file && triedToUpload}
      />

      <div className='text-center mt-6'>
        <StyledButton onClick={handleUpload} disabled={loading}>
          {loading ? 'Yükleniyor...' : 'Transkripti Oluştur'}
        </StyledButton>
      </div>

      {/* Transkript Sonucu */}
      {transcript && (
        <div className='mt-10 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md'>
          <h2 className='text-xl font-semibold mb-2 text-gray-900 dark:text-white'>
            <FaFileAlt className='inline mr-2' /> Transkript
          </h2>

          <div className='flex flex-col md:flex-row gap-4 mt-4'>
            <StyledButton onClick={handleTranscriptDownload}>
              <FaDownload className='inline mr-2' />
              Transkripti İndir
            </StyledButton>
          </div>
        </div>
      )}

      {/* Özet Sonucu */}
      {summary && (
        <div className='mt-6 bg-gray-200 dark:bg-gray-700 p-6 rounded-xl shadow-md'>
          <h2 className='text-xl font-semibold mb-2 text-gray-800 dark:text-white'>
            🧠 Özet
          </h2>

          <StyledButton onClick={handleSummaryDownload} className='mt-4'>
            <FaDownload className='inline mr-2' />
            Özeti İndir
          </StyledButton>
        </div>
      )}
    </div>
  );
}
