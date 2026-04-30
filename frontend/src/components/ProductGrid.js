import ProductCard from "./ProductCard";
export default function ProductGrid({ products = [], loading, onCompare, comparedProducts, onSummarize }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div key={n} className="glass-card rounded-3xl h-[400px] animate-pulse bg-slate-800/30" />
        ))}
      </div>
    );
  }
  if (products.length === 0) {
    return (
      <div className="text-center py-20 glass-card rounded-[2rem] border-dashed border-2 border-white/5">
        <p className="text-slate-500">No products found. Try a different search.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          product={product}
          onCompare={onCompare}
          isCompared={comparedProducts?.some(p => p.title === product.title)}
          onSummarize={onSummarize}
        />
      ))}
    </div>
  );
}