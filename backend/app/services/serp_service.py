import requests
from app.core.config import SERP_API_KEY

def search_products(query: str):
    url = "https://serpapi.com/search"

    # 🔥 1. SHOPPING (for price, image, rating)
    shop_params = {
        "engine": "google",
        "tbm": "shop",
        "q": query,
        "api_key": SERP_API_KEY,
        "gl": "in",
        "hl": "en"
    }

    shop_res = requests.get(url, params=shop_params).json()

    products = []

    for item in shop_res.get("shopping_results", [])[:5]:
        products.append({
            "title": item.get("title"),
            "price": item.get("price"),
            "rating": item.get("rating", 0),
            "image": item.get("thumbnail"),
            "link": None   # will fill next
        })

    # 🔥 2. ORGANIC (for REAL LINKS)
    org_params = {
        "engine": "google",
        "q": query,
        "api_key": SERP_API_KEY,
        "gl": "in",
        "hl": "en"
    }

    org_res = requests.get(url, params=org_params).json()

    real_links = [
        item.get("link")
        for item in org_res.get("organic_results", [])
        if item.get("link")
    ]

    # 🔥 3. MERGE LINKS INTO PRODUCTS
    for i in range(min(len(products), len(real_links))):
        products[i]["link"] = real_links[i]

    return products