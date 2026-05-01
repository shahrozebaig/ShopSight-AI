import { useState } from "react";
import { uploadImage } from "../services/api";
export default function UploadBox({ setProducts, setLoading }) {
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
    } catch {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-full flex items-center gap-6 px-4">
      <label className="flex-1 h-[80px] border-2 border-black border-dashed flex items-center justify-center cursor-pointer hover:bg-zinc-50 transition-all relative group overflow-hidden">
        {preview ? (
          <div className="w-full h-full flex items-center gap-4 px-4 bg-white">
            <div className="w-16 h-16 border-2 border-black flex-shrink-0">
              <img src={preview} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black uppercase truncate">{file.name}</p>
              <p className="text-[9px] opacity-40 uppercase tracking-widest">Image_Loaded</p>
            </div>
            <div className="absolute inset-0 bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">Change_File</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 text-black/40 group-hover:text-black">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Drop_Image_or_Click</span>
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </label>
      {file && (
        <button
          onClick={handleUpload}
          className="h-[80px] px-8 bg-[#dc2626] text-white flex items-center justify-center gap-4 hover:bg-black transition-all group"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">ANALYZE_IMAGE</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      )}
    </div>
  );
}