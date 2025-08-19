from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse
from typing import List
from app.services.whisper_service import transcribe_segment_with_whisper
from app.services.gpt_summary import summarize_text
from app.utils.audio_utils import process_audio_and_diarize
import os

router = APIRouter()

@router.post("/transcribe/")
async def transcribe_audio(background_tasks: BackgroundTasks, files: List[UploadFile] = File(...)):
    if not files:
        raise HTTPException(status_code=400, detail="No files were provided")

    #dosyaların bulunduğu yapi
    results = []

    for file in files:
        tmp_path, y, sr, diarization = process_audio_and_diarize(file)
        transcript = []
        full_text = ""

        for turn, _, speaker in diarization.itertracks(yield_label=True):
            start_sample = int(turn.start * sr)
            end_sample = int(turn.end * sr)
            segment_audio = y[start_sample:end_sample]

            text = transcribe_segment_with_whisper(segment_audio, sr)
            full_text += text + " "

            if text:
                transcript.append({
                    "speaker": speaker,
                    "start": round(turn.start, 2),
                    "end": round(turn.end, 2),
                    "text": text
                })

        summary = await summarize_text(full_text)

        results.append({
            "filename": file.filename,
            "transcript": transcript,
            "summary": summary
        })

        os.remove(tmp_path)

    return JSONResponse(content={"results": results})