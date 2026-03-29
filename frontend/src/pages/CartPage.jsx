import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    const { data } = await api.get('/cart');
    setCart(data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart]
  );

  const checkout = async () => {
    await api.post('/orders', {
      shippingAddress: {
        fullName: 'Sample Customer',
        phone: '1234567890',
        address: '123 Pink Street',
        city: 'Beauty City',
        zipCode: '10001'
      },
      paymentMethod: 'mock-card'
    });
    alert('Payment successful! Order created.');
    navigate('/orders');
  };

  return (
    <main className="mx-auto max-w-4xl space-y-4 px-4 py-8">
      <h1 className="text-3xl font-bold text-pink-700">Your Cart</h1>
      {cart.map((item) => (
        <div key={item.product._id} className="flex items-center justify-between rounded bg-white p-4 shadow">
          <div className="flex items-center gap-3">
            <img src={item.product.image} alt={item.product.name} className="h-16 w-16 rounded object-cover" />
            <div>
              <p className="font-medium">{item.product.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
          </div>
          <p className="font-semibold text-pink-600">${(item.product.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}
      <div className="rounded bg-white p-4 shadow">
        <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
        <button onClick={checkout} className="mt-3 rounded bg-pink-500 px-4 py-2 text-white">Mock Checkout</button>
      </div>
    </main>
  );
}
