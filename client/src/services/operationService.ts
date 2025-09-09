import api from "@/api/apiClient";
import { type DepositFormData } from "@/types/schemas";

export const depositService = async (data: DepositFormData) => {
  const response = await api.post(`/operation/deposit`, data);
  return response.data;
};

export const withdrawService = async (data: DepositFormData) => {
  const response = await api.post(`/operation/withdraw`, data);
  return response.data;
};