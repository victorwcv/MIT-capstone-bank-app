import api from "@/api/api";
import { type TransactionFormData } from "@/types/schemas";

export const transactionService = async (data: TransactionFormData) => {
  const response = await api.post("/transactions", data);
  return response.data;
};
