// models/Request.ts
import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user';
import { IProduct } from './product';

export interface IRequest extends Document {
  userId: IUser['_id'];
  productId: IProduct['_id'];
  status: 'pending' | 'completed';
}

const RequestSchema: Schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
});

export default mongoose.models.Request || mongoose.model<IRequest>('Request', RequestSchema);
