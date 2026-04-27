def fuse_results(products):
    results = []
    seen = set()

    for item in products:
        title = item.get("title")
        link = item.get("link") or item.get("product_link")

        # 🔥 FIX HERE
        image = item.get("image") or item.get("thumbnail")

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