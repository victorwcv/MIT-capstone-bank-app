import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  documentId: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    documentId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
