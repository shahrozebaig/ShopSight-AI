def fuse_results(products):
    results = []
    for item in products:
        title = item.get("title")
        link = item.get("link")
        image = item.get("thumbnail")
        price = item.get("price")
        rating = item.get("rating", 0)
        if not title or not link:
            continue
        if len(title) < 5:
            continue
        if isinstance(price, str):
            price = price.replace(",", "")
        results.append({
            "title": title,
            "link": link,
            "image": image,
            "price": price,
            "rating": rating
        })
    results = sorted(results, key=lambda x: x["rating"], reverse=True)
    return results[:5]