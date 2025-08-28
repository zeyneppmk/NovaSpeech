# 🎵 NovaSpeech 

<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/6c521c55-9350-4c85-bf95-fbc3bf4049fa" />

---

## 📋 Proje Özeti

Bu çalışmada, sesli içeriklerin metne dönüştürülmesi ve içeriklerinin özetlenmesi süreçlerini otomatikleştiren, çok katmanlı bir yapay zekâ destekli web uygulaması olan NovaSpeech’in tasarımını ve uygulanmasını konu almaktadır. Projenin temel motivasyonu, sesli konuşmaların manuel olarak yazıya dökülmesinde yaşanan zaman kaybı, verimsizlik ve hata riskini azaltmaktır.
NovaSpeech uygulamasında ses transkripsiyonu için Whisper modeli, konuşmacı ayrımı (diarization) için pyannote.audio, özetleme işlemi için ise GPT-3.5 Turbo modeli entegre edilmiştir. Tüm yapay zekâ işlemleri, bir mikroservis olarak yapılandırılan FastAPI tabanlı altyapı üzerinden yürütülmüştür. Ana uygulama ise Django REST Framework ile geliştirilmiş ve PostgreSQL tabanlı bir veritabanı kullanılmıştır. Kullanıcı arayüzü ise React.js ve Tailwind CSS ile geliştirilmiş, bileşen tabanlı ve duyarlı (responsive) bir tasarım uygulanmıştır.

 ---

## 💥 Öne Çıkan Özellikler

- Kullanıcı Dostu ve Modern Bir Platform 
- Ses Verilerinin Metne Çevrilmesi(Ses Transkripsiyonu)
- Otomatik Özetlemme(GPT tabanlı model)
- PDF Çıktısı
- Konuşmacı Ayrımının(Speaker Diarization) Yapılması
- Mikroservis Mimarisi (Django + FasAPI)

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

## 📥 Kurulum Adımları

**1️⃣ Projeyi Klonlayın**
```bash
git clone https://github.com/<kullanici>/novaspeech.git
cd novaspeech
```

**2️⃣  Konfigürasyon - Environment Veriables**
Her servis için .env dosyalarını oluşturun (example.env şablonları mevcuttur):

- **Django** → django/.env
  
```env
CLOUDINARY_CLOUD_NAME=**************
CLOUDINARY_API_KEY=****************
CLOUDINARY_API_SECRET=***************
```

- **FastAPI** → fastapi/.env
  
```env
OPENAI_API_KEY=****************
HUGGINGFACE_TOKEN=****************
```

- **React** → frontend/.env

```env
VITE_API_URL=
VITE_API_URL=
```

**3️⃣ Docker Ağı Oluşturun**

```bash
docker network create app-network
```

**4️⃣ FastAPI İmajını Çalıştırın**

```bash
cd whisper-docker
docker build -t whisper-api-img .
#Bu kedi projeme göre verildi fakat siz container isimlerini farklı kullanabilirsiniz
docker run --env-file .env -p 8001:8000 --network app-network --name fastapi_container whisper-api-img
```

**5️⃣ Django, PostgreSQL ve Frontend’i Çalıştırın**

```bash
#django projesi içndeyken
cd ..
docker-compose build
docker-compose up
```

**6️⃣ Django Migrasyonları**

```bash
docker exec -it backend_django-django bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

---


### 🔍 Servis Adresleri

**Frontend (React)** → http://localhost:3000

**Backend API (Django)** → http://localhost:8000

**FastAPI Servisi** → http://localhost:8001/docs

---

### 🛠️ Log ve Hata Kontrolleri

Tüm servis logları:

```bash
docker-compose logs -f
```

FastAPI logları:

```bash
docker logs backend_django-fastapi
```

Django logları:

```bash
docker logs backend_django-django
```

Network doğrulama:

```bash
docker network inspect app-network
```

Django içinden FastAPI testi:

```bash
docker exec -it backend_django-django bash
apt-get update && apt-get install -y curl
curl http://fastapi:8000/docs
curl http://fastapi:8000/transcribe/
```

---

### 🤗 Hugging Face Modeli Yükleme

```bash
FastAPI container içine girerek Pyannote modelini indirin:

docker exec -it backend_django-fastapi bash
python
>>> from pyannote.audio import Pipeline
>>> pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization-3.1", use_auth_token="HF_TOKENINIZ")
>>> exit()
```

Model indirildikten sonra imajı güncelleyin:
```bash
docker commit backend_django-fastapi whisper-api-img
docker-compose down
docker-compose up --build
```

--- 

### 📖 Kullanım

**1.** http://localhost:3000
 adresine gidin.

**2.** Django admin panelinden kullanıcı oluşturun veya React arayüzünden kayıt olun.

**3.** Ses dosyası yükleyin.

**4.** Transkript, konuşmacı ayrımı ve özet sonuçlarını görüntüleyin.

**5.** Çıktıları PDF olarak indirin.
   
---

### 👨‍💻 Geliştirici Notları

- İlk çalıştırmada modeller indirileceği için biraz zaman alabilir.

- Cloudinary için geçerli bir API Key gereklidir.

- GPU destekli ortamda çalıştırmak isterseniz Dockerfile’ı CUDA tabanlı imajlarla güncelleyebilirsiniz.


---

## 🐛 Sorun Giderme
❗ **Yaygın Sorunlar ve Çözümleri**

### 1. Port Çakışması
Projede kullanılan portlar:  
- **Frontend (React):** `3000`  
- **Django Backend:** `8000`  
- **FastAPI:** `8001`  
- **PostgreSQL:** `5432`

Portların dolu olup olmadığını kontrol edin:
```bash
lsof -i :3000
lsof -i :8000
lsof -i :8001
```

Sorun varsa container’ları durdurup yeniden başlatın:
```bash
docker-compose down
docker-compose up -d
```

### 2. JWT / SECRET_KEY Hatası

- backend/.env dosyasında SECRET_KEY tanımlı olmalı.

- .env dosyalarının doğru dizinlerde olduğundan emin olun.

- Django’nun DEBUG ve ALLOWED_HOSTS ayarlarını kontrol edin.

### 3. Frontend Bağlantı Sorunu

Frontend ile backend arasında bağlantı sorunu varsa:
```bash
docker-compose restart frontend
docker-compose logs frontend
```

.env dosyasında REACT_APP_API_URL=http://localhost:8000 şeklinde backend URL’ini kontrol edin.

### 4. Build Hataları

Docker cache sorun çıkardığında temiz build deneyin:
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

### 5. Model İndirme Sorunları

Hugging Face modeli indirilemezse token’inizin geçerli olup olmadığını kontrol edin.

Alternatif olarak container içinde elle indirme yapabilirsiniz:
```bash
docker exec -it backend_django-fastapi bash
python -c "from pyannote.audio import Pipeline; Pipeline.from_pretrained('pyannote/speaker-diarization-3.1', use_auth_token='HF_TOKENINIZ')"
```

---

## 📊 Demo
🎯 Özellik Gösterimi

**1. Ses Yükleme ve Transkripsiyon**

- MP3 / WAV dosyası yükleme

- Whisper tabanlı yüksek doğruluklu transkripsiyon

- JSON + PDF çıktı alma

**2. Konuşmacı Ayrımı**

- Pyannote.audio tabanlı speaker diarization

- Birden fazla konuşmacının otomatik ayırımı

- Transkript üzerinde konuşmacı etiketleri

**3. Özetleme**

- Uzun transkriptlerden otomatik özet çıkarma

- GPT tabanlı metin işleme entegrasyonu

- Kısa, orta ve detaylı özet seçenekleri

**4. Kullanıcı Yönetimi**

- JWT tabanlı authentication

- Django admin paneli üzerinden kullanıcı yönetimi

- Çoklu kullanıcı desteği

**5. Monitoring ve Loglama**

- docker-compose logs -f ile gerçek zamanlı log takibi

- Servis bazlı log kontrolü (Django, FastAPI, DB) 

- Hata ayıklama için container içi erişim

**6. API Dokümantasyonu**

- Django REST API: http://localhost:8000/api

- FastAPI Docs: http://localhost:8001/docs

- Swagger UI ile interaktif API testleri


---

⭐ Bu proje ben ve grup arkadaşım(https://github.com/hasretbagg) tarafından geliştirilmiştir beğendiyseniz yıldız vermeyi unutmayın!










