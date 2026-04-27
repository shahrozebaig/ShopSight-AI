export default function ProductCard({ product }) {
  return (
    <div className="border p-3 rounded-xl shadow bg-white flex flex-col">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 object-cover rounded"
      />

      <h3 className="font-semibold mt-2 text-sm line-clamp-2">
        {product.title}
      </h3>

      <div className="mt-1 flex items-center justify-between">
        <p className="font-bold">{product.price}</p>
        <p className="text-sm">⭐ {product.rating || 0}</p>
      </div>

      <a
        href={product.link}
        target="_blank"
        rel="noreferrer"
        className="mt-3 bg-green-600 text-white text-center py-1 rounded hover:bg-green-700"
      >
        Buy Now
      </a>
    </div>
  );
}