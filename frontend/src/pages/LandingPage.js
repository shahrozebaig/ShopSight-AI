import React from 'react';
export default function LandingPage({ onExplore }) {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black font-sans">
      <header className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-6 md:py-10 flex justify-between items-center bg-black/40 backdrop-blur-md border-b border-white/5">
        <h1 className="text-2xl md:text-3xl anton tracking-tighter uppercase text-[#dc2626]">SHOPSIGHT AI</h1>
        <nav className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-12">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm font-black uppercase tracking-[0.2em] hover:text-[#dc2626] transition-colors">Hero</button>
          <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-black uppercase tracking-[0.2em] hover:text-[#dc2626] transition-colors">How_It_Works</button>
          <button onClick={() => scrollToSection('insights')} className="text-sm font-black uppercase tracking-[0.2em] hover:text-[#dc2626] transition-colors">Product_Insights</button>
        </nav>
        <div className="w-32 hidden md:block" />
      </header>
      <section className="relative h-screen flex items-center px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero.png"
            alt="AI Shopping Experience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-5xl space-y-10 mt-20">
          <div className="space-y-0">
            <h2 className="text-6xl md:text-8xl lg:text-[10vw] anton tracking-tighter leading-none uppercase flex flex-col gap-4 md:gap-8">
              <span className="text-white">SEARCH</span>
              <span className="text-amber-500">FIND.. SHOP</span>
              <span className="text-[#dc2626]">SMARTER</span>
            </h2>
            <div className="h-6" />
            <p className="text-base md:text-xl font-medium opacity-60 max-w-xl leading-relaxed uppercase tracking-tight">
              Upload any product image, ask anything, and get real-time results with the power of multimodal AI.
            </p>
          </div>
          <button
            onClick={onExplore}
            className="group flex items-center gap-6 px-12 py-5 border-2 border-[#dc2626] bg-[#dc2626]/5 hover:bg-[#dc2626] transition-all duration-500"
          >
            <span className="text-xs font-black uppercase tracking-[0.2em]">Try It Now</span>
            <svg className="w-6 h-6 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </section>
      <section id="how-it-works" className="py-16 md:py-32 px-6 md:px-12 bg-[#fffbf0] text-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-amber-400/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <div className="flex justify-between items-end mb-12 md:mb-24">
            <h3 className="text-4xl md:text-7xl anton tracking-tighter uppercase">OPERATIONAL_FLOW</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-0 border-4 border-black bg-white/50 backdrop-blur-sm">
            {[
              { step: '01', title: 'VISUAL_INGESTION', desc: 'Upload images or describe products. Our neural engine parses multi-modal inputs instantly.' },
              { step: '02', title: 'CROSS_ANALYSIS', desc: 'Execute side-by-side comparisons. Data-driven matrices reveal structural differences.' },
              { step: '03', title: 'INTELLIGENCE_DECISION', desc: 'Generate AI summaries and sentiment reports. Make informed acquisitions with zero fluff.' }
            ].map((item, i) => (
              <div key={i} className="p-12 border-b-4 md:border-b-0 md:border-r-4 last:border-0 border-black space-y-8 hover:bg-white transition-colors group">
                <span className="text-6xl anton tracking-tighter text-zinc-200 group-hover:text-amber-500 transition-colors">{item.step}</span>
                <div className="space-y-4">
                  <h4 className="text-2xl anton tracking-tight uppercase">{item.title}</h4>
                  <p className="text-sm font-medium leading-relaxed opacity-60 uppercase tracking-tight">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="insights" className="py-48 px-12 bg-[#f8fafc] text-[#0a0a0a] border-t-4 border-black relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <div className="grid lg:grid-cols-12 gap-24">
            <div className="lg:col-span-4 space-y-12">
              <h3 className="text-8xl anton tracking-tighter leading-[0.8] uppercase">PRODUCT<br />INSIGHTS</h3>
              <p className="text-lg font-medium opacity-60 leading-relaxed uppercase tracking-tight">
                Move beyond simple browsing. Our AI core provides deep-level analysis on any product in your inventory.
              </p>
            </div>
            <div className="lg:col-span-8 grid md:grid-cols-2 gap-12">
              <div className="p-8 border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] space-y-8">
                <div className="flex justify-between items-center border-b-2 border-black pb-4">
                  <h4 className="text-xl anton tracking-tight uppercase">CROSS_COMPARISON</h4>
                </div>
                <div className="space-y-4 font-mono text-[10px] tracking-tighter">
                  <div className="grid grid-cols-3 gap-4 border-b border-black/10 pb-2">
                    <span className="opacity-40">PARAMETER</span>
                    <span>iPhone_15</span>
                    <span>Galaxy_S23</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 border-b border-black/10 pb-2">
                    <span className="opacity-40">PRICE</span>
                    <span className="font-bold">₹56,000</span>
                    <span className="font-bold">₹55,000</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 border-b border-black/10 pb-2">
                    <span className="opacity-40">DISPLAY</span>
                    <span>Super Retina</span>
                    <span>Dynamic AMOLED</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2 aspect-square border-2 border-black overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1663314326587-1c78fe2b7d5b?w=900&auto=format&fit=crop" alt="iPhone" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-1/2 aspect-square border-2 border-black overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1709744722656-9b850470293f?w=900&auto=format&fit=crop" alt="Galaxy" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              <div className="p-8 border-4 border-black bg-[#0a0a0a] text-white shadow-[12px_12px_0px_0px_rgba(220,38,38,1)] space-y-8 mt-12 md:mt-24">
                <div className="flex justify-between items-center border-b-2 border-white/20 pb-4">
                  <h4 className="text-xl anton tracking-tight uppercase">AI_SYNTHESIS</h4>
                </div>
                <div className="space-y-6">
                  <div className="p-6 bg-white/5 border-l-4 border-[#dc2626]">
                    <p className="text-sm font-medium leading-relaxed uppercase tracking-tight">
                      "The Galaxy S24 offers a superior refresh rate and battery optimization, while the iPhone 15 excels in ecosystem integration and video processing. For pure performance-to-value, the S24 is the current unit leader."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-[#0a0a0a] text-white py-24 px-12 relative overflow-hidden border-t border-white/10">
        <div className="relative z-10">
          <h4 className="text-6xl anton tracking-tighter uppercase text-[#dc2626]">SHOPSIGHT_AI</h4>
        </div>
        <div className="text-[30vw] anton tracking-tighter leading-[0.8] text-white/[0.02] absolute -bottom-16 left-0 whitespace-nowrap pointer-events-none">
          SIGHT_CORE
        </div>
      </footer>
    </div>
  );
}