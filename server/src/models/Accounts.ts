import { Schema, model, Document, Types } from "mongoose";

export interface IAccount extends Document {
  ownerId: Types.ObjectId;
  accountName: string;
  alias: string | null;
  accountNumber: string;
  currency: string;
  balance: number;
}

const accountSchema = new Schema<IAccount>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    accountName: { type: String, required: true },
    alias: { type: String, default: null },
    accountNumber: { type: String, required: true, unique: true },
    currency: { type: String, required: true },
    balance: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Account = model<IAccount>("Account", accountSchema);
