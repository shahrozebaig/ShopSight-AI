import { useState } from "react";
import { uploadImage } from "../services/api";
export default function UploadBox({ setProducts, setLoading, setDescription }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };
  const handleUpload = async () => {
    if (!file) return;
    try {
      setLoading(true);
      const data = await uploadImage(file);
      setProducts(data.results || []);
      setDescription(data.description || "");
    } catch {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-4">
      <label className={`relative group flex flex-col items-center justify-center border-2 border-dashed ${file ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-white/10 hover:border-white/20'} rounded-2xl p-8 cursor-pointer transition-all duration-300`}>
        {preview ? (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-sm font-bold">Change Image</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-slate-300 font-semibold">Drop image here</p>
              <p className="text-slate-500 text-xs">PNG, JPG, WEBP up to 10MB</p>
            </div>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      {file && (
        <button
          onClick={handleUpload}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          <span>Identify & Search</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      )}
    </div>
  );
}
