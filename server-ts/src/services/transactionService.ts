import { Transaction } from "@/models";
import { type ITransaction } from "@/models/Transaction";

export const createTransaction = async (transactionData: Partial<ITransaction>): Promise<ITransaction> => {
  const transaction = new Transaction(transactionData);
  return await transaction.save();
}