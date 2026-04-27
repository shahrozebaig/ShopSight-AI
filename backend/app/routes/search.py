from fastapi import APIRouter, UploadFile, File
from app.services.serp_service import search_products
router = APIRouter()
@router.post("/")
async def search_image(file: UploadFile = File(...)):
    query = file.filename.replace(".jpg", "").replace(".png", "")
    results = search_products(query)
    return {"query": query, "results": results}