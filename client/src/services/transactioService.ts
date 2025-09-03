import api from "@/api/api";
import { type DepositFormData } from "@/types/schemas";

export const depositService = async (data: DepositFormData) => {
  const response = await api.post(`/transactions/deposit`, data);
  return response.data;
};
