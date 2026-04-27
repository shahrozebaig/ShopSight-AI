from fastapi import APIRouter, UploadFile, File
import tempfile
from app.services.voice_service import speech_to_text
router = APIRouter()
@router.post("/")
async def voice(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    text = speech_to_text(tmp_path)

    return {"text": text}