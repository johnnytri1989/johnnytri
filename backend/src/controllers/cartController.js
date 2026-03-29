import User from '../models/User.js';
import Product from '../models/Product.js';

export const getCart = async (req, res) => {
  const user = await User.findById(req.user._id).populate('cart.product');
  res.json(user.cart);
};

export const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  if (!productId) return res.status(400).json({ message: 'productId is required' });

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const user = await User.findById(req.user._id);
  const existing = user.cart.find((item) => item.product.toString() === productId);

  if (existing) {
    existing.quantity += Number(quantity);
  } else {
    user.cart.push({ product: productId, quantity: Number(quantity) });
  }

  await user.save();
  const populated = await user.populate('cart.product');
  res.json(populated.cart);
};

export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const user = await User.findById(req.user._id);
  const item = user.cart.find((entry) => entry.product.toString() === req.params.productId);

  if (!item) return res.status(404).json({ message: 'Cart item not found' });
  if (quantity <= 0) {
    user.cart = user.cart.filter((entry) => entry.product.toString() !== req.params.productId);
  } else {
    item.quantity = Number(quantity);
  }

  await user.save();
  const populated = await user.populate('cart.product');
  res.json(populated.cart);
};

export const clearCart = async (req, res) => {
  const user = await User.findById(req.user._id);
  user.cart = [];
  await user.save();
  res.json({ message: 'Cart cleared' });
};
