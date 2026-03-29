import { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders/my').then((res) => setOrders(res.data));
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold text-pink-700">Order History</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="rounded bg-white p-4 shadow">
            <p className="font-semibold">Order #{order._id.slice(-6)}</p>
            <p className="text-sm text-gray-600">Status: {order.status}</p>
            <p className="text-sm text-gray-600">Total: ${order.totalAmount.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
