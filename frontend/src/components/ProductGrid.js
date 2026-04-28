import ProductCard from "./ProductCard";
export default function ProductGrid({ products = [], loading }) {
  if (loading)
    return (
      <div className="flex justify-center items-center mt-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  if (!products.length)
    return (
      <p className="text-center mt-10 text-gray-500 text-sm">
        No products found
      </p>
    );
  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {products.map((p, i) => (
        <ProductCard key={p.link || i} product={p} />
      ))}
    </div>
  );
}