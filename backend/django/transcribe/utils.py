import cloudinary.uploader
import cloudinary.exceptions
import httpx
import os
import aiofiles
from fpdf import FPDF
import uuid


def upload_to_cloudinary(file_path, folder="transcripts"):
    try:
        upload_result = cloudinary.uploader.upload(
            file_path,
            resource_type="raw",  # raw = ses, txt, pdf gibi dosyalar için
            folder=folder
        )
        return upload_result["secure_url"]
    except cloudinary.exceptions.Error as e:
        raise Exception(f"Cloudinary upload failed: {str(e)}")
    
def upload_pdf_to_cloudinary(file_path, folder="transcripts"):
    try:
        upload_result = cloudinary.uploader.upload(
            file_path,
            resource_type="raw",
            folder=folder,
            upload_preset="pdf_raw_public",
            use_filename=True,
            unique_filename=False
        )
        print("Cloudinary Upload Sonucu:", upload_result)
        return upload_result["secure_url"]
    except cloudinary.exceptions.Error as e:
        raise Exception(f"Cloudinary PDF upload failed: {str(e)}")


async def send_audio_to_fastapi(file_path):
    # Doğru FastAPI endpoint
    fastapi_url = "http://fastapi:8000/transcribe/"

    try:
        timeout = httpx.Timeout(120.0)  # 60 saniye veriyoruz
        async with httpx.AsyncClient(timeout=timeout) as client:
            with open(file_path, "rb") as f:
                files = [("files", (os.path.basename(file_path), f, "audio/wav"))]
                response = await client.post(fastapi_url, files=files)

        # Hata varsa Exception fırlat
        response.raise_for_status()

        # fastapiden json dosyası
        return response.json()

    except httpx.HTTPError as e:
        raise Exception(f"FastAPI iletişim hatası: {str(e)}")


def generate_pdf(content, title,is_summary=False):
    pdf = FPDF()
    pdf.add_page()

    font_path = os.path.join(os.path.dirname(__file__), "..", "core", "fonts", "DejaVuSans.ttf")
    font_path = os.path.abspath(font_path)

    try:
        pdf.add_font("DejaVu", "", font_path, uni=True)
        pdf.set_font("DejaVu", size=12)
    except Exception as e:
        print(f"Font eklenirken hata: {e}")

    pdf.cell(200, 10, txt=title, ln=True, align="C")
    pdf.ln(10)

    if is_summary:
        # Sadece düz metni yaz
        pdf.multi_cell(0, 10, txt=content)
    else:
        for segment in content:
            try:
                speaker = segment['speaker']
                text = segment['text']
                entry = f"{speaker}: {text}"
                pdf.multi_cell(0, 10, txt=entry)
                pdf.ln(5)
            except Exception as e:
                print(f"[Uyarı] Segment işlenemedi: {e}")
                continue

    os.makedirs("temp", exist_ok=True)
    file_path = f"temp/{uuid.uuid4().hex}_{title}.pdf"

    try:
        pdf.output(file_path)
        print(f"PDF kaydedildi. Dosya boyutu: {os.path.getsize(file_path)} byte")
    except Exception as e:
        print(f"PDF kaydedilirken hata: {e}")

    return file_path

