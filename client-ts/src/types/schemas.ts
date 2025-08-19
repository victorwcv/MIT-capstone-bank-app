import { z } from "zod";

export const loginSchema = z.object({
  documentId: z.string().min(1, { message: "Document ID is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    fullName: z.string().min(1, { message: "Full name is required" }),
    email: z.email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
    documentId: z.string().regex(/^\d{8}$/, { message: "Document ID must be 8 digits" }),
    terms: z.boolean().refine((val) => val, {
      message: "You must accept the terms and conditions",
    }),
    conditions: z.boolean().refine((val) => val, {
      message: "You must accept the conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const transactionSchema = z.object({
  type: z.enum(["DEPÓSITO", "RETIRO"]),
  amount: z.number().min(0.01, { message: "Monto debe ser mayor a 0" }),
  description: z.string().min(1, { message: "Descripción requerida" }),
  category: z.string().min(1, { message: "Categoría requerida" }),
  account: z.string().min(1, { message: "Cuenta destino requerida" }),
});


export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type TransactionFormData = z.infer<typeof transactionSchema>;
