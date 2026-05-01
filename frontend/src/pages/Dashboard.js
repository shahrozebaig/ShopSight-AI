import React, { useState } from 'react';
import UploadBox from "../components/UploadBox";
import ProductGrid from "../components/ProductGrid";
import ChatBox from "../components/ChatBox";
import { sendChat, compareProducts, summarizeReviews } from "../services/api";
export default function Dashboard({ onBack }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastQuery, setLastQuery] = useState("");
  const [comparedProducts, setComparedProducts] = useState([]);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [reviewSummary, setReviewSummary] = useState(null);
  const [notification, setNotification] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: 100000,
    gender: 'all',
    brand: 'all'
  });
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };
  const handleGlobalSearch = async (query, page = 1) => {
    try {
      setLoading(true);
      setCurrentPage(page);
      setLastQuery(query);
      const res = await sendChat(query, page);
      if (res.products) setProducts(res.products);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    } catch (e) {
      console.error(e);
      showNotification("SEARCH_ERROR: ENGINE_TIMEOUT");
    } finally {
      setLoading(false);
    }
  };
  const filteredProducts = products.filter(p => {
    let priceVal = 0;
    if (p.price) {
      priceVal = parseInt(p.price.replace(/[^0-9]/g, '')) || 0;
    }
    const matchesPrice = priceVal <= filters.priceRange || filters.priceRange >= 100000;
    const titleLower = p.title?.toLowerCase() || '';
    const isFemale = titleLower.includes('women') || titleLower.includes('female') || titleLower.includes('girl') || titleLower.includes('lady') || titleLower.includes('ladies');
    const isMale = (titleLower.includes('men') && !titleLower.includes('women')) || titleLower.includes('male') || titleLower.includes('boy') || titleLower.includes('gent') || titleLower.includes('man');
    const matchesGender = filters.gender === 'all' ||
      (filters.gender === 'male' && isMale) ||
      (filters.gender === 'female' && isFemale);
    const matchesBrand = filters.brand === 'all' || titleLower.includes(filters.brand.toLowerCase());
    return matchesPrice && matchesGender && matchesBrand;
  });
  const handleCompare = (product) => {
    setComparedProducts(prev => {
      const isAlreadyAdded = prev.find(p => p.title === product.title);
      if (isAlreadyAdded) {
        return prev.filter(p => p.title !== product.title);
      }
      if (prev.length >= 3) {
        showNotification("MAX_CAPACITY: 3_ITEMS_ONLY");
        return prev;
      }
      return [...prev, product];
    });
  };
  const runComparison = async () => {
    if (comparedProducts.length < 2) return;
    try {
      setAnalyzing(true);
      const res = await compareProducts(comparedProducts);
      setComparisonResult(res.analysis);
      setReviewSummary(null);
    } catch (e) {
      console.error(e);
      showNotification("COMPARISON_ERROR: DATA_CORRUPTION");
    } finally {
      setAnalyzing(false);
    }
  };
  const handleSummarize = async (product) => {
    try {
      setAnalyzing(true);
      const mockReviews = [
        "Great quality and feels premium.",
        "A bit expensive but worth it for the features.",
        "The battery life could be better.",
        "Exactly what I was looking for, highly recommend!"
      ];
      const res = await summarizeReviews(mockReviews);
      setReviewSummary({ title: product.title, summary: res.summary });
      setComparisonResult(null);
    } catch (e) {
      console.error(e);
      showNotification("SUMMARY_ERROR: AI_OFFLINE");
    } finally {
      setAnalyzing(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#fffbf0] text-[#0a0a0a] selection:bg-black selection:text-white font-sans relative overflow-hidden">
      {notification && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[1000] animate-slide-down">
          <div className="bg-black text-white px-8 py-4 border-2 border-[#dc2626] shadow-[8px_8px_0px_0px_rgba(220,38,38,0.3)] flex items-center gap-4">
            <div className="w-2 h-2 bg-[#dc2626] animate-ping" />
            <span className="text-xs font-black uppercase tracking-[0.3em]">{notification}</span>
          </div>
        </div>
      )}
      <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-amber-400/5 blur-[100px] rounded-full pointer-events-none" />
      <header className="heavy-header !py-4 md:!py-6 border-b border-black/5 bg-white/40 backdrop-blur-md sticky top-0 z-[100] px-6 md:px-12">
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-[#dc2626]"
          >
            <span>Back</span>
          </button>
          <div className="h-4 w-px bg-black/20" />
          <h1 className="text-xl md:text-2xl anton tracking-tighter uppercase">SHOPSIGHT_DASHBOARD</h1>
        </div>
      </header>
      <main className="pt-12 md:pt-24 pb-48 max-w-[1800px] mx-auto px-6 md:px-12">
        <section className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="relative group">
            <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
            <div className="relative p-4 border-2 border-black bg-white h-[100px] flex items-center justify-center">
              <UploadBox setProducts={setProducts} setLoading={setLoading} />
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
            <div className="relative p-4 border-2 border-black bg-white h-[100px]">
              <div className="h-full flex flex-col justify-center">
                <ChatBox setProducts={setProducts} setLoading={setLoading} onSearch={handleGlobalSearch} />
              </div>
            </div>
          </div>
        </section>
        <section className="pb-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b-2 border-black pb-4 gap-4">
            <h3 className="text-4xl md:text-7xl anton tracking-tighter uppercase leading-tight">AI_PRODUCT_SELECTION</h3>
            <div className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40 pb-2">
              {filteredProducts.length} Items_Visible | PAGE_{currentPage}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-16">
            <aside className="w-full lg:w-64 shrink-0">
              <div className="sticky top-32 space-y-8">
                <div className="p-6 bg-zinc-100 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-black/10 pb-2">Price_Range</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between text-[9px] font-black">
                      <span>₹500</span>
                      <span className="text-[#dc2626]">₹{filters.priceRange.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="100000"
                      step="500"
                      value={filters.priceRange}
                      onChange={(e) => setFilters(prev => ({ ...prev, priceRange: parseInt(e.target.value) }))}
                      className="w-full h-1 bg-black/20 appearance-none cursor-pointer accent-black"
                    />
                  </div>
                </div>
                <div className="p-6 border-2 border-black bg-white space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-black/10 pb-2">Category</h4>
                  <div className="flex flex-col gap-3">
                    {['all', 'male', 'female'].map(g => (
                      <button
                        key={g}
                        onClick={() => setFilters(prev => ({ ...prev, gender: g }))}
                        className={`text-left text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3
                          ${filters.gender === g ? 'text-[#dc2626]' : 'text-black/40 hover:text-black'}`}
                      >
                        <div className={`w-2.5 h-2.5 border-2 border-black ${filters.gender === g ? 'bg-black' : ''}`} />
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setFilters({ priceRange: 100000, gender: 'all', brand: 'all' })}
                  className="w-full py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#dc2626] transition-all"
                >
                  Clear_Filters
                </button>
              </div>
            </aside>
            <div className="flex-1 min-h-[800px]">
              <ProductGrid
                products={filteredProducts}
                loading={loading}
                onCompare={handleCompare}
                comparedProducts={comparedProducts}
                onSummarize={handleSummarize}
              />
              {filteredProducts.length > 0 && (
                <div className="mt-24 flex justify-center gap-4">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      onClick={() => handleGlobalSearch(lastQuery, num)}
                      disabled={loading}
                      className={`w-14 h-14 border-4 border-black font-black transition-all flex items-center justify-center
                        ${currentPage === num
                          ? 'bg-[#dc2626] text-white translate-x-1 translate-y-1 shadow-none'
                          : 'bg-white text-black hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      {comparedProducts.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full z-[100] animate-slide-up">
          <div className="bg-black text-white p-6 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/10">
            <div className="flex items-center gap-8">
              <div className="flex -space-x-4">
                {comparedProducts.map((p, i) => (
                  <div key={i} className="w-16 h-16 border-2 border-black bg-zinc-800 overflow-hidden transition-all">
                    <img src={p.thumbnail} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-2xl anton tracking-tight uppercase">{comparedProducts.length} ITEMS_QUEUED</p>
                <p className="text-[10px] font-black tracking-[0.4em] opacity-40 uppercase">Ready_to_Analyze</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <button
                onClick={() => setComparedProducts([])}
                className="text-[10px] font-black uppercase tracking-widest hover:line-through"
              >
                Clear_Queue
              </button>
              <button
                onClick={runComparison}
                disabled={comparedProducts.length < 2 || analyzing}
                className={`px-12 py-5 text-sm font-black uppercase tracking-[0.2em] transition-all
                  ${comparedProducts.length >= 2
                    ? 'bg-white text-black hover:invert shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]'
                    : 'bg-zinc-900 text-zinc-700 cursor-not-allowed'}`}
              >
                {analyzing ? 'Processing...' : 'COMPARE_NOW'}
              </button>
            </div>
          </div>
        </div>
      )}
      {comparisonResult && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-white/90 backdrop-blur-md" onClick={() => setComparisonResult(null)} />
          <div className="relative bg-white border-4 border-black max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-[40px_40px_0px_0px_rgba(0,0,0,0.1)] flex flex-col">
            <div className="p-12 border-b-2 border-black flex justify-between items-center bg-black text-white">
              <div className="space-y-1">
                <h3 className="text-5xl anton tracking-tighter uppercase">PRODUCT_COMPARISON</h3>
                <p className="text-[10px] font-black tracking-[0.5em] uppercase opacity-40">Direct_Sight_Analysis</p>
              </div>
              <button onClick={() => setComparisonResult(null)} className="hover:rotate-90 transition-transform p-2">
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
              {(() => {
                try {
                  const startIdx = comparisonResult.indexOf('{');
                  const endIdx = comparisonResult.lastIndexOf('}');
                  if (startIdx === -1 || endIdx === -1) throw new Error("Fmt_Err");
                  const data = JSON.parse(comparisonResult.substring(startIdx, endIdx + 1));
                  return (
                    <div className="space-y-12">
                      <div className="border-2 border-black overflow-hidden">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b-2 border-black bg-zinc-100">
                              <th className="p-8 text-[10px] font-black uppercase tracking-[0.4em] border-r-2 border-black w-48">AI_METRIC</th>
                              {comparedProducts.map((p, i) => (
                                <th key={i} className="p-8 border-r-2 border-black last:border-r-0">
                                  <div className="space-y-4">
                                    <div className="w-24 h-32 border-2 border-black overflow-hidden">
                                      <img src={p.thumbnail} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <h4 className="text-sm font-medium tracking-tight leading-tight">{p.title}</h4>
                                  </div>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y-2 divide-black">
                            {data.rows.map((row, i) => (
                              <tr key={i} className="hover:bg-zinc-50 transition-colors">
                                <td className="p-8 text-[10px] font-black uppercase tracking-widest border-r-2 border-black bg-zinc-50">{row[0]}</td>
                                {row.slice(1).map((cell, j) => (
                                  <td key={j} className="p-8 text-sm font-medium tracking-tight border-r-2 border-black last:border-r-0">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                } catch (e) {
                  return <div className="p-12 font-mono text-xs border-2 border-black bg-zinc-100 whitespace-pre-wrap">{comparisonResult}</div>;
                }
              })()}
            </div>
          </div>
        </div>
      )}
      {reviewSummary && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setReviewSummary(null)} />
          <div className="relative bg-white border-4 border-black max-w-2xl w-full shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] p-12">
            <div className="flex justify-between items-start mb-12">
              <div className="space-y-1">
                <h3 className="text-4xl anton tracking-tighter uppercase">INTELLIGENCE_REPORT</h3>
                <p className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40">{reviewSummary.title}</p>
              </div>
              <button onClick={() => setReviewSummary(null)} className="hover:line-through text-xs font-black uppercase">Close</button>
            </div>
            <div className="p-8 bg-zinc-100 border-l-8 border-black">
              <p className="text-xl font-bold tracking-tight italic leading-relaxed">"{reviewSummary.summary}"</p>
            </div>
            <div className="mt-12 flex justify-end">
              <button
                onClick={() => setReviewSummary(null)}
                className="px-12 py-4 bg-black text-white font-black text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}