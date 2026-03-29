import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  const { color, brand, minPrice, maxPrice, search, bestSeller } = req.query;
  const query = {};

  if (color) query.color = new RegExp(color, 'i');
  if (brand) query.brand = new RegExp(brand, 'i');
  if (search) query.name = new RegExp(search, 'i');
  if (bestSeller === 'true') query.isBestSeller = true;

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const products = await Product.find(query).sort({ createdAt: -1 });
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

export const createProduct = async (req, res) => {
  const body = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : body.image;

  const required = ['name', 'color', 'brand', 'price', 'stock'];
  for (const key of required) {
    if (!body[key]) return res.status(400).json({ message: `${key} is required` });
  }

  const product = await Product.create({
    ...body,
    image: image || 'https://via.placeholder.com/400x400.png?text=Lipstick',
    price: Number(body.price),
    stock: Number(body.stock)
  });

  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;
  Object.assign(product, req.body);
  if (image) product.image = image;

  const updated = await product.save();
  res.json(updated);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  await product.deleteOne();
  res.json({ message: 'Product deleted' });
};
