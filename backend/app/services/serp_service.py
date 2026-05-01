import requests
import logging
from app.core.config import SERP_API_KEY
logger = logging.getLogger(__name__)
def safe_get_json(url, params):
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        logger.error(f"Error fetching data from SerpApi: {e}")
        return {}
def search_products(image_url: str):
    url = "https://serpapi.com/search"
    params = {
        "engine": "google_lens",
        "url": image_url,
        "api_key": SERP_API_KEY
    }
    data = safe_get_json(url, params)
    products = []
    for item in data.get("visual_matches", [])[:12]: 
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
            shop_res = safe_get_json(url, shop_params)
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
    import random
    random.shuffle(products)
    return products
def search_products_text(query: str, page: int = 1):
    url = "https://serpapi.com/search"
    diversified_query = query
    query_lower = query.lower()
    if not any(x in query_lower for x in ["men", "women", "kids", "girl", "boy"]):
        if page == 1:
            diversified_query = f"{query} for men women"
        elif page == 2:
            diversified_query = f"{query} for girls boys"
        else:
            diversified_query = f"{query} unisex collection"
    elif page > 1:
        diversified_query = f"{query} page {page} new"
    params = {
        "engine": "google_shopping",
        "q": diversified_query,
        "api_key": SERP_API_KEY,
        "gl": "in",
        "hl": "en",
        "start": (page - 1) * 40, 
        "direct_link": "true" 
    }
    data = safe_get_json(url, params)
    products = []
    results = data.get("shopping_results", [])
    if not results:
        results = data.get("inline_shopping_results", [])
    for item in results:
        link = item.get("link") or item.get("product_link")
        if not link:
            continue
        products.append({
            "title": item.get("title"),
            "link": link,
            "thumbnail": item.get("thumbnail") or item.get("source_icon"),
            "price": item.get("price"),
            "rating": item.get("rating", 0)
        })
    if len(products) < 10:
        params["engine"] = "google"
        params["tbm"] = "shop"
        params["start"] = (page - 1) * 20 
        params["num"] = 20
        data = safe_get_json(url, params)
        for item in data.get("shopping_results", []):
            link = item.get("link") or item.get("product_link")
            if not link: continue
            products.append({
                "title": item.get("title"),
                "link": link,
                "thumbnail": item.get("thumbnail"),
                "price": item.get("price"),
                "rating": item.get("rating", 0)
            })
    if not products:
        params["tbm"] = None
        params["engine"] = "google"
        params["num"] = 10
        fallback_res = safe_get_json(url, params)
        for item in fallback_res.get("organic_results", []):
            link = item.get("link")
            if not link: continue
            thumb = item.get("thumbnail")
            if not thumb and item.get("rich_snippet"):
                rich = item.get("rich_snippet", {})
                thumb = rich.get("top", {}).get("thumbnail")
            products.append({
                "title": item.get("title"),
                "link": link,
                "thumbnail": thumb,
                "price": "View Deal",
                "rating": 4.0
            })
    return products