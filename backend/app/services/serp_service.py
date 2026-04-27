import requests
from app.core.config import SERP_API_KEY
def search_products(image_url: str):
    url = "https://serpapi.com/search"
    params = {
        "engine": "google_lens",
        "url": image_url,
        "api_key": SERP_API_KEY
    }
    response = requests.get(url, params=params)
    data = response.json()
    products = []
    for item in data.get("visual_matches", []):
        products.append({
            "title": item.get("title"),
            "link": item.get("link"),
            "thumbnail": item.get("thumbnail")
        })
    return products