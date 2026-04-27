import ProductCard from "./ProductCard";
export default function ProductGrid({ products, loading }) {
  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (!products.length)
    return <p className="text-center mt-4">No products</p>;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {products.map((p, i) => (
        <ProductCard key={i} product={p} />
      ))}
    </div>
  );
}