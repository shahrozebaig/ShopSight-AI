from fastapi import APIRouter, UploadFile, File
import requests
from app.core.config import IMGBB_API_KEY, SERP_API_KEY
router = APIRouter()
@router.post("/")
async def search_image(file: UploadFile = File(...)):
    image_bytes = await file.read()
    imgbb_url = "https://api.imgbb.com/1/upload"
    files = {
        "image": image_bytes
    }
    data = {
        "key": IMGBB_API_KEY
    }
    imgbb_res = requests.post(imgbb_url, data=data, files=files).json()
    print("IMGBB RESPONSE:", imgbb_res)
    if "data" not in imgbb_res:
        return {"error": "ImgBB upload failed", "response": imgbb_res}
    image_url = imgbb_res["data"]["url"]
    serp_url = "https://serpapi.com/search"
    params = {
        "engine": "google_lens",
        "api_key": SERP_API_KEY,
        "url": image_url
    }
    response = requests.get(serp_url, params=params)
    return response.json()