from fastapi import APIRouter, UploadFile, File
import tempfile
import os
from app.services.voice_service import speech_to_text
from app.services.serp_service import search_products_text
router = APIRouter()
@router.post("/")
async def voice(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name
    text = speech_to_text(tmp_path)
    os.remove(tmp_path)
    products = search_products_text(text)
    return {
        "query": text,
        "products": products
    }