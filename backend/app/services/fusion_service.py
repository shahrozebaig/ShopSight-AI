def fuse_results(products):
    return sorted(products, key=lambda x: x["rating"], reverse=True)