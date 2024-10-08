import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  imageUrl: string; // New field for the image URL
}

const ProductSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: false }, // Add image URL to schema
});

const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
