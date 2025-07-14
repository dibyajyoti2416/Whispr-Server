import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document { 
  email: string;
  otp?: string;
  verified: boolean;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  otp: { type: String },
  verified: { type: Boolean, default: false },
});

export default mongoose.model<IUser>('User', userSchema);
