import React from 'react';
export default function ProductCard({ product, onCompare, isCompared, onSummarize }) {
  const placeholder = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop";
  const imageUrl = product.thumbnail || placeholder;
  return (
    <div className={`brutalist-card group relative flex flex-col h-full 
      ${isCompared ? 'border-4 border-black ring-8 ring-black/5 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)]' : ''}`}>
      <div className="relative aspect-[3/4] bg-zinc-200 overflow-hidden">
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          onError={(e) => { e.target.src = placeholder; }}
        />
        <div className="absolute top-0 right-0 z-20">
          <div className="technical-badge">
            {product.rating > 0 ? `RANK_${product.rating}` : "NEW"}
          </div>
        </div>
        <div className="absolute bottom-4 left-4 z-20">
          <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <input
              type="checkbox"
              checked={isCompared}
              onChange={() => onCompare(product)}
              className="w-4 h-4 rounded-none border-2 border-black text-black focus:ring-0"
            />
            <span className="text-[10px] font-black text-black uppercase tracking-widest">Compare</span>
          </label>
        </div>
      </div>
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium tracking-tight leading-tight transition-all">
            {product.title}
          </h3>
        </div>
        <div className="flex items-center gap-6 mt-auto">
          <button
            onClick={() => onSummarize(product)}
            className="text-[10px] font-black text-black uppercase tracking-widest hover:line-through border-b border-black/20 pb-1"
          >
            AI_Summary
          </button>
        </div>
        <div className="pt-4 border-t border-black/5 flex items-center justify-between">
          <p className="text-2xl font-mono tracking-tighter font-bold">
            {product.price ? product.price : "???"}
          </p>
          {product.link && (
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-zinc-800 transition-all hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}