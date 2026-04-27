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
    for item in data.get("visual_matches", [])[:5]:
        title = item.get("title")
        price = None
        rating = 0
        if title:
            shop_params = {
                "engine": "google",
                "tbm": "shop",
                "q": title,
                "api_key": SERP_API_KEY,
                "gl": "in",
                "hl": "en"
            }
            shop_res = requests.get(url, params=shop_params).json()
            if shop_res.get("shopping_results"):
                first = shop_res["shopping_results"][0]
                price = first.get("price")
                rating = first.get("rating", 0)
        products.append({
            "title": title,
            "link": item.get("link"),
            "thumbnail": item.get("thumbnail"),
            "price": price,
            "rating": rating
        })
    return products