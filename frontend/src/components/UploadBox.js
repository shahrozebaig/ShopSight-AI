import { useState } from "react";
import { uploadImage } from "../services/api";
export default function UploadBox({ setProducts, setLoading }) {
  const [file, setFile] = useState(null);
  const handleUpload = async () => {
    if (!file) return;
    try {
      setLoading(true);
      const data = await uploadImage(file);
      setProducts(data.results);
    } catch (e) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4 border rounded-xl text-center bg-white shadow">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        onClick={handleUpload}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Search
      </button>
    </div>
  );
}