from tempfile import NamedTemporaryFile
import soundfile as sf
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def transcribe_segment_with_whisper(segment_audio, sample_rate):
    duration = len(segment_audio) / sample_rate
    if duration < 0.1:
        return ""

    with NamedTemporaryFile(delete=True, suffix=".wav") as temp_file:
        sf.write(temp_file.name, segment_audio, sample_rate, format='WAV')
        with open(temp_file.name, "rb") as audio_file:
            response = client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file,
                language = "tr"
            )
    return response.text
