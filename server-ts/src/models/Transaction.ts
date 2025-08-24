import { Schema, model, Document, Types } from "mongoose";

export interface ITransaction extends Document {
  currency: "USD" | "PEN" | "EUR" 
  amount: number;
  type: "deposit" | "withdraw" | "transfer";
  description: string;
  originAccountId: Types.ObjectId;
  destinationAccountId: Types.ObjectId;
}

const transactionSchema = new Schema<ITransaction>(
  {
    currency: { type: String, enum: ["USD", "PEN", "EUR"], required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["deposit", "withdraw", "transfer"], required: true },
    description: { type: String, default: "" },
    originAccountId: { 
      type: Schema.Types.ObjectId,
      ref: "Account", 
      default: null 
    },
    destinationAccountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Transaction = model<ITransaction>("Transaction", transactionSchema);
