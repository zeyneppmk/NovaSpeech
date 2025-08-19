from tempfile import NamedTemporaryFile
import librosa
import soundfile as sf
from pyannote.audio import Pipeline
import os
from dotenv import load_dotenv

load_dotenv()
pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization-3.1", use_auth_token=os.getenv("HUGGINGFACE_TOKEN"))

def process_audio_and_diarize(file):
    with NamedTemporaryFile(delete=False, suffix=".wav") as temp_wav:
        tmp_path = temp_wav.name
        tmp_bytes = file.file.read()
        temp_wav.write(tmp_bytes)
        temp_wav.flush()

    y, sr = librosa.load(tmp_path, sr=16000, mono=True)
    sf.write(tmp_path, y, sr, format='WAV')
    diarization = pipeline(tmp_path)
    return tmp_path, y, sr, diarization
