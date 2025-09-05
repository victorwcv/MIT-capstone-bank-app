import { Transaction } from "@/models";
import { type ITransaction } from "@/models/Transaction";

export const saveTransaction = async (
  transactionData: Partial<ITransaction>
): Promise<ITransaction> => {
  const transaction = new Transaction(transactionData);
  await transaction.save();
  return transaction;
};

export const getTransactions = async (
  userId: string,
  page: number,
  limit: number
): Promise<ITransaction[]> => {
  const transactions = await Transaction.find({ ownerId: userId })
    .skip((page - 1) * limit)
    .limit(limit);
  return transactions;
};

export const getTotalTransactions = async (userId: string): Promise<number> => {
  const count = await Transaction.countDocuments({ ownerId: userId });
  return count;
}
