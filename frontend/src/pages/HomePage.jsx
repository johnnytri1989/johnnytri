import { useEffect, useState } from 'react';
import { api } from '../api/client';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    color: '',
    brand: '',
    minPrice: '',
    maxPrice: ''
  });

  const fetchProducts = async () => {
    const { data } = await api.get('/products', { params: filters });
    setProducts(data);
  };

  const fetchBestSellers = async () => {
    const { data } = await api.get('/products', { params: { bestSeller: true } });
    setBestSellers(data);
  };

  const addToCart = async (productId) => {
    await api.post('/cart', { productId, quantity: 1 });
    alert('Added to cart');
  };

  useEffect(() => {
    fetchBestSellers();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timeout);
  }, [filters]);

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      <section className="rounded-3xl bg-gradient-to-r from-pink-200 to-rose-100 p-8 text-center">
        <h1 className="text-3xl font-bold text-pink-700 md:text-4xl">Find Your Signature Lipstick</h1>
        <p className="mt-2 text-gray-700">Premium shades, feminine vibes, and glowing confidence.</p>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-pink-700">Best Sellers</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bestSellers.map((product) => (
            <ProductCard key={product._id} product={product} onAdd={addToCart} />
          ))}
        </div>
      </section>

      <FilterBar filters={filters} setFilters={setFilters} />

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-pink-700">All Lipsticks</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} onAdd={addToCart} />
          ))}
        </div>
      </section>
    </main>
  );
}
