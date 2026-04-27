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
    for item in data.get("visual_matches", [])[:10]:
        title = item.get("title")
        link = item.get("link")
        if not link:
            continue
        link_lower = link.lower()
        if any(x in link_lower for x in ["youtube", "reddit", "review", "watch"]):
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
                "hl": "en"
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
        "hl": "en"
    }
    response = requests.get(url, params=params)
    data = response.json()
    products = []
    for item in data.get("shopping_results", [])[:5]:
        products.append({
            "title": item.get("title"),
            "link": item.get("link"),
            "thumbnail": item.get("thumbnail"),
            "price": item.get("price"),
            "rating": item.get("rating", 0)
        })
    return products