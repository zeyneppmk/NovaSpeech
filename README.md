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

---

## 🏗️ Sistemin Blok Diyagramı

<img width="1377" height="672" alt="image" src="https://github.com/user-attachments/assets/4dc95d6d-8b0b-43c5-9630-75de30de123b" />

---

## 🚀 Hızlı Başlangıç

**1) Depoyu klonla**

```python
git clone https://github.com/<kullanici>/novaspeech.git
cd novaspeech
```
**2) Ortam değişkenlerini hazırla**

Örnek dosyayı kopyala ve değerleri doldur:
```python
cp .env.example .env
cp .env.ai.example .env.ai
```

Gerekli anahtarlar:

DJANGO_SECRET, ALLOWED_HOSTS

POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB

CLOUDINARY_URL (ör. cloudinary://<key>:<secret>@<cloud_name>)

OPENAI_API_KEY (özetleme için)

PYANNOTE_TOKEN (konuşmacı ayrımı için, gerekiyorsa)

WHISPER_MODEL (örn: small, base, medium)

3) Servisleri başlat
# Docker Compose v2:
docker compose up -d --build

# (Eski sürüm kullanıyorsan)
# docker-compose up -d --build

4) Durumu kontrol et
docker compose ps
# veya: docker-compose ps

5) Servislere erişim

Frontend (React): http://localhost:3000

Core API (Django REST): http://localhost:8000

AI Service (FastAPI): http://localhost:8001

İlk çalıştırmada migrasyonlar otomatik değilse:

docker compose exec core-api python manage.py migrate
























