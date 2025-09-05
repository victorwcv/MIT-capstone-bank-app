import type { CurrencyType, TransactionType } from "@/types/types";
import { Schema, model, Document, Types } from "mongoose";

export interface ITransaction extends Document {
  ownerId: string;
  currency: CurrencyType;
  amount: number;
  type: TransactionType;
  description: string;
  userAccountId: string;
  destinationAccountId: string;
}

const transactionSchema = new Schema<ITransaction>(
  {
    ownerId: { type: String, required: true },
    currency: {
      type: String,
      enum: ["USD", "PEN", "EUR"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["deposit", "withdraw", "transfer"],
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    userAccountId: {
      type: String,
      default: null,
    },
    destinationAccountId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Transaction = model<ITransaction>("Transaction", transactionSchema);
