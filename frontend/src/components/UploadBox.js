import { useState } from "react";
import { uploadImage } from "../services/api";
export default function UploadBox({ setProducts, setLoading }) {
  const [file, setFile] = useState(null);
  const handleUpload = async () => {
    if (!file) return;
    try {
      setLoading(true);
      const data = await uploadImage(file);
      setProducts(data.results || []);
    } catch {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-5 border text-center">
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-black transition">
        <span className="text-gray-500 text-sm">
          Click or drag image to upload
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
      </label>
      {file && (
        <p className="mt-3 text-sm text-gray-600 truncate">
          {file.name}
        </p>
      )}
      <button
        onClick={handleUpload}
        className="mt-4 w-full bg-black text-white py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
      >
        Search by Image
      </button>
    </div>
  );
}