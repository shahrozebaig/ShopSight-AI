from fastapi import APIRouter, UploadFile, File
import requests
from app.core.config import IMGBB_API_KEY
from app.services.serp_service import search_products
from app.services.fusion_service import fuse_results
from app.services.llm_service import generate_description
from app.services.vision_service import get_product_name

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

    # 🔥 GET PRODUCT NAME
    product_name = get_product_name(image_bytes)

    # 🔥 CLEAN PRODUCT NAME (MAIN FIX)
    if product_name:
        product_name = product_name.replace("\n", " ")
        product_name = product_name.replace("*", "")
        if ":" in product_name:
            product_name = product_name.split(":")[-1].strip()

    print("CLEAN PRODUCT:", product_name)

    if not product_name:
        return {
            "description": "",
            "results": []
        }

    # 🔥 SEARCH PRODUCTS
    products = search_products(product_name)

    if not products:
        return {
            "description": "",
            "results": []
        }

    final = fuse_results(products)

    description = generate_description(final)

    return {
        "description": description,
        "results": final
    }