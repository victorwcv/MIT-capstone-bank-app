import api from "@/api/apiClient";

export const getUserAccounts = async (userId: string) => {
  const accounts = await api.get(`/accounts/${userId}`);
  return accounts.data;
};
