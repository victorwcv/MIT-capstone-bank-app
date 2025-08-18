import { type LoginFormData } from "@/types/schemas";
import api from "@/api/api";

export const loginService = async (data: LoginFormData) => {
  // Simulación de API
  return new Promise<{ documentId: string }>((resolve, reject) => {
    setTimeout(() => {
      if (data.documentId === "1234567" && data.password === "password") {
        resolve({ documentId: data.documentId });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
};

export const registerService = async (data: LoginFormData) => {
  const response = await api.post("/users", data);
  return response.data;
};