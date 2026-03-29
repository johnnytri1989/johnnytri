import Order from '../models/Order.js';
import User from '../models/User.js';

export const createOrder = async (req, res) => {
  const { shippingAddress, paymentMethod = 'mock-card' } = req.body;
  const user = await User.findById(req.user._id).populate('cart.product');

  if (!user.cart.length) return res.status(400).json({ message: 'Cart is empty' });

  const items = user.cart.map((item) => ({
    product: item.product._id,
    name: item.product.name,
    image: item.product.image,
    price: item.product.price,
    quantity: item.quantity
  }));

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = await Order.create({
    user: req.user._id,
    items,
    totalAmount,
    shippingAddress,
    paymentMethod,
    paymentStatus: 'paid', // mock payment successful
    status: 'processing'
  });

  user.cart = [];
  await user.save();

  res.status(201).json(order);
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  order.status = status || order.status;
  await order.save();
  res.json(order);
};
