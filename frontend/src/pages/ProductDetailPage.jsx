import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/client';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  const addToCart = async () => {
    await api.post('/cart', { productId: id, quantity: 1 });
    alert('Added to cart');
  };

  if (!product) return <p className="p-8">Loading...</p>;

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-2">
      <img src={product.image} alt={product.name} className="h-[420px] w-full rounded-2xl object-cover" />
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-pink-700">{product.name}</h1>
        <p className="text-gray-600">{product.description}</p>
        <p>Brand: <strong>{product.brand}</strong></p>
        <p>Color: <strong>{product.color}</strong></p>
        <p className="text-2xl font-bold text-pink-600">${product.price.toFixed(2)}</p>
        <button onClick={addToCart} className="rounded-lg bg-pink-500 px-5 py-2 text-white">Add to Cart</button>

        <section className="pt-4">
          <h2 className="mb-2 text-xl font-semibold">Reviews</h2>
          <div className="space-y-3">
            {product.reviews?.map((review, idx) => (
              <div key={idx} className="rounded-lg bg-pink-50 p-3">
                <p className="font-medium">{review.userName} • ⭐ {review.rating}</p>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
