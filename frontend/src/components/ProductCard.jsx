import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-2xl border border-pink-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full rounded-xl object-cover"
        />
      </Link>
      <div className="mt-3 space-y-1">
        <h3 className="font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.brand} • {product.color}</p>
        <p className="text-sm text-yellow-500">⭐ {product.rating?.toFixed(1) ?? '4.5'}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-pink-600">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAdd(product._id)}
            className="rounded-lg bg-pink-500 px-3 py-1 text-white opacity-90 transition group-hover:opacity-100"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
