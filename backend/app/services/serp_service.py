from serpapi import GoogleSearch
from app.core.config import SERP_API_KEY
def search_products(query: str):
    params = {
        "engine": "google_shopping",
        "q": query,
        "api_key": SERP_API_KEY
    }
    search = GoogleSearch(params)
    results = search.get_dict()
    products = []
    for item in results.get("shopping_results", []):
        products.append({
            "title": item.get("title"),
            "price": item.get("price"),
            "link": item.get("link"),
            "thumbnail": item.get("thumbnail"),
            "rating": item.get("rating", 0)
        })
    return products