import { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    name: '',
    color: '',
    brand: '',
    price: '',
    stock: '',
    image: '',
    description: '',
    isBestSeller: false
  });

  const load = async () => {
    const [pRes, oRes] = await Promise.all([api.get('/products'), api.get('/orders')]);
    setProducts(pRes.data);
    setOrders(oRes.data);
  };

  useEffect(() => {
    load();
  }, []);

  const createProduct = async (e) => {
    e.preventDefault();
    await api.post('/products', form);
    setForm({ name: '', color: '', brand: '', price: '', stock: '', image: '', description: '', isBestSeller: false });
    load();
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    load();
  };

  const updateOrderStatus = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status });
    load();
  };

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-2">
      <section className="rounded bg-white p-4 shadow">
        <h2 className="mb-3 text-xl font-bold text-pink-700">Add Product</h2>
        <form onSubmit={createProduct} className="grid gap-2">
          {['name', 'color', 'brand', 'price', 'stock', 'image', 'description'].map((field) => (
            <input
              key={field}
              placeholder={field}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              className="rounded border p-2"
            />
          ))}
          <label className="text-sm">
            <input type="checkbox" checked={form.isBestSeller} onChange={(e) => setForm({ ...form, isBestSeller: e.target.checked })} /> Best seller
          </label>
          <button className="rounded bg-pink-500 py-2 text-white">Create</button>
        </form>

        <div className="mt-4 space-y-2">
          {products.map((p) => (
            <div key={p._id} className="flex items-center justify-between rounded bg-pink-50 p-2">
              <span>{p.name}</span>
              <button className="text-red-500" onClick={() => deleteProduct(p._id)}>Delete</button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded bg-white p-4 shadow">
        <h2 className="mb-3 text-xl font-bold text-pink-700">Manage Orders</h2>
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order._id} className="rounded bg-pink-50 p-3">
              <p className="font-semibold">#{order._id.slice(-6)} - {order.user?.email}</p>
              <p className="text-sm">Status: {order.status}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {['processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                  <button key={status} className="rounded bg-white px-2 py-1 text-xs" onClick={() => updateOrderStatus(order._id, status)}>
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
