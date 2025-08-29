import { type LoginFormData, type RegisterFormData } from "@/types/schemas";
import api from "@/api/api";

export const registerService = async (data: RegisterFormData) => {
  const response = await api.post("/user", data);
  return response.data;
};

export const loginService = async (data: LoginFormData) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const logoutService = async () => {
  const response = await api.get("/auth/logout");
  return response.data;
};
