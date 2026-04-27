import { useState } from "react";
import UploadBox from "./components/UploadBox";
import ProductGrid from "./components/ProductGrid";
import ChatBox from "./components/ChatBox";
import VoiceInput from "./components/VoiceInput";
import { sendChat } from "./services/api";
function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleVoiceText = async (text) => {
    try {
      setLoading(true);
      const res = await sendChat(text, products);
      if (res.products) {
        setProducts(res.products);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">
        ShopSight AI 🛍️
      </h1>
      <UploadBox setProducts={setProducts} setLoading={setLoading} />
      <ChatBox
        products={products}
        setProducts={setProducts}
        setLoading={setLoading}
      />
      <VoiceInput onText={handleVoiceText} />
      <ProductGrid products={products} loading={loading} />
    </div>
  );
}
export default App;