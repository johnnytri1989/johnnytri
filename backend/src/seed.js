import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/Product.js';
import User from './models/User.js';
import Order from './models/Order.js';

dotenv.config();
await connectDB();

await Promise.all([Product.deleteMany(), User.deleteMany(), Order.deleteMany()]);

const admin = await User.create({
  name: 'Admin',
  email: 'admin@lipglow.com',
  password: 'Admin123!',
  role: 'admin'
});

await User.create({
  name: 'Jane Customer',
  email: 'jane@example.com',
  password: 'Password123!',
  role: 'user'
});

await Product.insertMany([
  {
    name: 'Velvet Rose Matte',
    color: 'Rose Pink',
    brand: 'LipGlow',
    price: 18.99,
    stock: 120,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    description: 'Long-lasting matte finish with rich rose pigment.',
    rating: 4.8,
    isBestSeller: true,
    reviews: [
      { userName: 'Mia', rating: 5, comment: 'My go-to daily shade. Stunning!' },
      { userName: 'Olivia', rating: 4, comment: 'Smooth texture and great wear time.' }
    ]
  },
  {
    name: 'Cherry Kiss Satin',
    color: 'Cherry Red',
    brand: 'BloomBeauty',
    price: 21.5,
    stock: 90,
    image: 'https://images.unsplash.com/photo-1610717203263-4d4a4d1721a7?auto=format&fit=crop&w=800&q=80',
    description: 'Satin lipstick with hydrating formula and bold color.',
    rating: 4.7,
    isBestSeller: true,
    reviews: [
      { userName: 'Sophia', rating: 5, comment: 'Perfect red for night-out glam.' },
      { userName: 'Emma', rating: 4, comment: 'Very pigmented and non-drying.' }
    ]
  },
  {
    name: 'Nude Cloud Cream',
    color: 'Warm Nude',
    brand: 'LushLips',
    price: 16,
    stock: 140,
    image: 'https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=800&q=80',
    description: 'Creamy nude lipstick for all-day comfort.',
    rating: 4.5,
    isBestSeller: false,
    reviews: [
      { userName: 'Ava', rating: 4, comment: 'Looks natural and elegant.' }
    ]
  }
]);

console.log('🌱 Seed completed');
console.log(`Admin login: ${admin.email} / Admin123!`);
process.exit(0);
