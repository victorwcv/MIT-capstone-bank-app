import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  fullName:  string;
  email: string;
  documentId: string;
  password: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  documentId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = model<IUser>('User', userSchema);