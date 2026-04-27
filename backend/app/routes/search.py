from fastapi import APIRouter, UploadFile, File
import tempfile
from app.services.embedding_service import get_image_query
from app.services.serp_service import search_products
from app.services.fusion_service import fuse_results
router = APIRouter()
@router.post("/")
async def search_image(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name
    query = get_image_query(tmp_path)
    products = search_products(query)
    final = fuse_results(products)
    return {
        "query": query,
        "results": final
    }