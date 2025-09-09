import apiClient from "@/api/apiClient";

export const getTransactions = async (userId: string, page: number, limit: number) => {
  const transactions = await apiClient.get(`/transaction/${userId}`, { params: { page, limit } });
  return transactions.data;
};
