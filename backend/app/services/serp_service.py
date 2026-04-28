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
    for item in data.get("visual_matches", [])[:5]:   # 🔥 ONLY 5
        title = item.get("title")
        link = item.get("link") or item.get("product_link")
        if not link:
            continue
        link_lower = link.lower()
        if any(x in link_lower for x in [
            "youtube", "reddit", "review", "watch", "google.com/search"
        ]):
            continue
        price = None
        rating = 0
        if title:
            shop_params = {
                "engine": "google",
                "tbm": "shop",
                "q": title,
                "api_key": SERP_API_KEY,
                "gl": "in",
                "hl": "en",
                "num": 5
            }
            shop_res = requests.get(url, params=shop_params).json()
            if shop_res.get("shopping_results"):
                first = shop_res["shopping_results"][0]
                price = first.get("price")
                rating = first.get("rating", 0)
        products.append({
            "title": title,
            "link": link,
            "thumbnail": item.get("thumbnail"),
            "price": price,
            "rating": rating
        })
    return products
def search_products_text(query: str):
    url = "https://serpapi.com/search"
    params = {
        "engine": "google",
        "tbm": "shop",
        "q": query,
        "api_key": SERP_API_KEY,
        "gl": "in",
        "hl": "en",
        "num": 5
    }
    response = requests.get(url, params=params)
    data = response.json()
    products = []
    for item in data.get("shopping_results", []):
        link = item.get("link") or item.get("product_link")
        if not link:
            continue
        products.append({
            "title": item.get("title"),
            "link": link,
            "thumbnail": item.get("thumbnail"),
            "price": item.get("price"),
            "rating": item.get("rating", 0)
        })
    if not products:
        fallback_params = {
            "engine": "google",
            "q": query,
            "api_key": SERP_API_KEY,
            "gl": "in",
            "hl": "en"
        }
        fallback_res = requests.get(url, params=fallback_params).json()
        for item in fallback_res.get("organic_results", [])[:5]:
            link = item.get("link")
            if not link:
                continue
            products.append({
                "title": item.get("title"),
                "link": link,
                "thumbnail": item.get("thumbnail"),
                "price": None,
                "rating": 0
            })
    return products