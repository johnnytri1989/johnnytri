import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    description: { type: String, default: '' },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    isBestSeller: { type: Boolean, default: false },
    reviews: [reviewSchema]
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
