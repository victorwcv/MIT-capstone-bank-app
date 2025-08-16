import { type LoginFormData } from "@/types/schemas";

export const loginApi = async (data: LoginFormData) => {
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
