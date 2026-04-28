export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 p-3 flex flex-col">
      <div className="w-full h-44 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
        <img
          src={product.thumbnail || "https://via.placeholder.com/150"}
          alt=""
          className="h-full object-contain hover:scale-105 transition"
        />
      </div>
      <div className="mt-3 flex flex-col gap-1 flex-1">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
          {product.title}
        </h3>
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <span className="text-yellow-500">★</span>
          <span>{product.rating ?? 0}</span>
        </div>
        <p className="text-lg font-bold text-black">
          {product.price || "—"}
        </p>
      </div>
      {product.link && (
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 bg-black text-white text-sm font-medium text-center py-2 rounded-xl hover:bg-gray-800 transition"
        >
          Buy Now
        </a>
      )}
    </div>
  );
}