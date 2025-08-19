FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y git ffmpeg

# pip işlemleri daha güvenli ve hızlı
ENV PIP_DEFAULT_TIMEOUT=1000

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]