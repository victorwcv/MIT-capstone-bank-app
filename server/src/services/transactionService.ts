import { Transaction } from "@/models";
import { type ITransaction } from "@/models/Transaction";

export const saveTransaction = async (transactionData: Partial<ITransaction>): Promise<ITransaction> => {
  const transaction = new Transaction(transactionData);
  await transaction.save();
  return  transaction;

}