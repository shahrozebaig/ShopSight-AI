import ProductCard from "./ProductCard";
export default function ProductGrid({ products = [], loading }) {
  if (loading) {
    return (
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="glass-card rounded-[2rem] p-5 space-y-4 animate-pulse">
            <div className="w-full h-56 bg-slate-800/50 rounded-2xl"></div>
            <div className="h-4 bg-slate-800/50 rounded w-3/4"></div>
            <div className="h-4 bg-slate-800/50 rounded w-1/2"></div>
            <div className="h-10 bg-slate-800/50 rounded-xl w-full mt-4"></div>
          </div>
        ))}
      </div>
    );
  }
  if (!products.length) {
    return (
      <div className="mt-20 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div>
          <h4 className="text-xl font-bold text-white">No products found</h4>
          <p className="text-slate-500 max-w-xs">Try searching for something else or use the visual search to find matching items.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((p, i) => (
        <ProductCard key={p.link || i} product={p} />
      ))}
    </div>
  );
}
