from fastapi import APIRouter, UploadFile, File
router = APIRouter()
@router.post("/")
async def voice_input(file: UploadFile = File(...)):
    return {"text": "voice to text coming soon"}