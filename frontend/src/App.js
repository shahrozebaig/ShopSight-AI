import { useState } from "react";
import UploadBox from "./components/UploadBox";
import ProductGrid from "./components/ProductGrid";
import ChatBox from "./components/ChatBox";
import VoiceInput from "./components/VoiceInput";
import { sendChat } from "./services/api";
function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(""); 
  const handleVoiceText = async (text) => {
    try {
      setLoading(true);
      const res = await sendChat(text);
      if (res.products) setProducts(res.products);
      if (res.response) setDescription(res.response); 
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            ShopSight AI
          </h1>
          <span className="hidden sm:block text-sm text-gray-500">
            AI Shopping Copilot
          </span>
        </div>
      </header>
      <section className="text-center py-12 px-6">
        <h2 className="text-4xl font-bold text-gray-900 leading-tight">
          Search Anything. Instantly.
        </h2>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Upload an image, speak, or type — find the best products across the web in seconds.
        </p>
      </section>
      <main className="max-w-7xl mx-auto px-6 flex-1 w-full">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-4">
              Image Search
            </h3>
            <UploadBox
              setProducts={setProducts}
              setLoading={setLoading}
              setDescription={setDescription} 
            />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-4">
              Text / Voice Search
            </h3>
            <ChatBox
              setProducts={setProducts}
              setLoading={setLoading}
            />
            <div className="mt-4 flex justify-end">
              <VoiceInput onText={handleVoiceText} />
            </div>
          </div>
        </div>
        {description && (
          <div className="mt-8 bg-white border rounded-2xl p-4 shadow-sm">
            <p className="text-sm text-gray-700">
              {description}
            </p>
          </div>
        )}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Results
            </h3>
            {products.length > 0 && (
              <span className="text-sm text-gray-500">
                {products.length} items
              </span>
            )}
          </div>
          <ProductGrid products={products} loading={loading} />
        </div>
      </main>
      <footer className="mt-16 py-6 text-center text-gray-500 text-sm border-t bg-white">
        © {new Date().getFullYear()} ShopSight AI • Built for smarter shopping
      </footer>
    </div>
  );
}
export default App;