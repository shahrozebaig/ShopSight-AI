import { useState } from "react";
import UploadBox from "./components/UploadBox";
import ProductGrid from "./components/ProductGrid";
import ChatBox from "./components/ChatBox";
import VoiceInput from "./components/VoiceInput";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleVoiceText = (text) => {
    // Put voice text into chat input by simulating a quick filter call
    // You can also wire this to ChatBox directly
    alert("Voice: " + text);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
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
    </div>
  );
}

export default App;