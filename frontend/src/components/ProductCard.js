export default function ProductCard({ product }) {
  return (
    <div className="border p-3 rounded-xl shadow bg-white">
      <img
        src={product.thumbnail}
        alt=""
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="font-semibold mt-2 text-sm">
        {product.title}
      </h3>
      <p className="font-bold">{product.price}</p>
      <p>⭐ {product.rating || 0}</p>
      <a
        href={product.link}
        target="_blank"
        rel="noreferrer"
        className="block mt-2 bg-green-600 text-white text-center py-1 rounded"
      >
        Buy Now
      </a>
    </div>
  );
}