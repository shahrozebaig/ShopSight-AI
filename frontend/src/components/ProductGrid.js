import ProductCard from "./ProductCard";

export default function ProductGrid({ products, loading }) {
  if (loading) {
    return <p className="mt-4 text-center">Loading...</p>;
  }

  if (!products || products.length === 0) {
    return <p className="mt-4 text-center text-gray-500">No products yet</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {products.map((p, i) => (
        <ProductCard key={i} product={p} />
      ))}
    </div>
  );
}