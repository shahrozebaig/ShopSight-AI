export default function ProductCard({ product, onCompare, isCompared, onSummarize }) {
  const placeholder = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop";
  const imageUrl = product.thumbnail || placeholder;
  return (
    <div className={`glass-card group rounded-3xl overflow-hidden transition-all duration-500 flex flex-col h-full ${isCompared ? 'border-indigo-500 ring-2 ring-indigo-500/50' : 'hover:border-indigo-500/50'}`}>
      <div className="relative w-full h-56 bg-slate-800/50 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.target.src = placeholder;
          }}
        />
        <div className="absolute top-3 left-3 z-20">
          <label className="flex items-center gap-2 cursor-pointer bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
            <input
              type="checkbox"
              checked={isCompared}
              onChange={() => onCompare(product)}
              className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Compare</span>
          </label>
        </div>
        <div className="absolute top-3 right-3 z-20">
          <button className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-white/70 hover:text-white hover:bg-indigo-500 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-base font-bold text-white line-clamp-2 group-hover:text-indigo-400 transition-colors">
            {product.title}
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20">
            <span className="text-yellow-400 text-sm">★</span>
            <span>{product.rating || "4.2"}</span>
          </div>
          <button
            onClick={() => onSummarize(product)}
            className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider hover:text-indigo-300 transition-colors"
          >
            AI Summary
          </button>
        </div>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <p className="text-2xl font-black text-white">
            {product.price ? product.price : "Check Price"}
          </p>
          {product.link && (
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/40 transition-all transform group-hover:translate-x-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
