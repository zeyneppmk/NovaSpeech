# 🎵 NovaSpeech 

<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/6c521c55-9350-4c85-bf95-fbc3bf4049fa" />

---

## 📋 Proje Özeti

Bu çalışmada, sesli içeriklerin metne dönüştürülmesi ve içeriklerinin özetlenmesi süreçlerini otomatikleştiren, çok katmanlı bir yapay zekâ destekli web uygulaması olan NovaSpeech’in tasarımını ve uygulanmasını konu almaktadır. Projenin temel motivasyonu, sesli konuşmaların manuel olarak yazıya dökülmesinde yaşanan zaman kaybı, verimsizlik ve hata riskini azaltmaktır.
NovaSpeech uygulamasında ses transkripsiyonu için Whisper modeli, konuşmacı ayrımı (diarization) için pyannote.audio, özetleme işlemi için ise GPT-3.5 Turbo modeli entegre edilmiştir. Tüm yapay zekâ işlemleri, bir mikroservis olarak yapılandırılan FastAPI tabanlı altyapı üzerinden yürütülmüştür. Ana uygulama ise Django REST Framework ile geliştirilmiş ve PostgreSQL tabanlı bir veritabanı kullanılmıştır. Kullanıcı arayüzü ise React.js ve Tailwind CSS ile geliştirilmiş, bileşen tabanlı ve duyarlı (responsive) bir tasarım uygulanmıştır.

 ---

## 💥 Öne Çıkan Özellikler

- Kullanıcı Dostu ve Modern Bir Platform 
- Ses Verilerinin Metne Çevrilmesi
- Ses Verilerinin Özetlenmesi
- Konuşmacı Ayrımının(Speaker Diarization) Yapılması

---

## 🛠️ Kullanılan Teknolojiler

- **Frontend**
  - ⚛️ **React.js** – Bileşen tabanlı modern kullanıcı arayüzü  
  - 🎨 **Tailwind CSS** – Hızlı ve responsive tasarım

- **Backend (Core API)**
  - 🐍 **Django REST Framework** – API geliştirme  
  - 🗄️ **PostgreSQL** – İlişkisel veritabanı  
  - 🔐 **JWT** – Kimlik doğrulama ve yetkilendirme  
  - ☁️ **Cloudinary** – Dosya yükleme & yönetim

- **AI Servisleri (Mikroservis)**
  - 🐍 FastAPI– Hafif ve hızlı mikroservis mimarisi
  - 🎙️ Whisper – Ses → Metin dönüşümü (ASR)
  - 🧑‍🤝‍🧑 pyannote.audio – Konuşmacı ayrımı (Diarization)
  - ✂️ GPT-3.5 Turbo – Otomatik özetleme

- **Altyapı & DevOps**
  - 🐳 Docker & Docker Compose – Servislerin kapsüllenmesi ve orkestrasyonu
  - 🔄 RESTful API – Servisler arası iletişim


<img width="939" height="450" alt="image" src="https://github.com/user-attachments/assets/5b9f8600-5801-473b-a124-15aa8cbfa7b6" />


