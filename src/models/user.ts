// models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
}

const UserSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password:{ type: String, required: true },
  isAdmin:{ type: Boolean, required: true }
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
