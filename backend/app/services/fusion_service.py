def fuse_results(products):
    results = []
    seen = set()
    for item in products:
        title = item.get("title")
        link = item.get("link")
        image = item.get("thumbnail") or item.get("image")
        price = item.get("price")
        rating = item.get("rating", 0)
        if not link:
            continue
        if not title:
            title = "Product"
        key = title.lower().strip()
        if key in seen:
            continue
        seen.add(key)
        results.append({
            "title": title,
            "link": link,
            "image": image,
            "price": price,
            "rating": rating
        })
    return results[:5]