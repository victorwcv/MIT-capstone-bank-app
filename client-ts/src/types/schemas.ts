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

export const transactionSchema = z
  .object({
    originAccountId: z.string().optional(),
    destinationAccountId: z.string().optional(),
    type: z.enum(["deposit", "withdraw", "transfer"]),
    amount: z.string().refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, "Amount must be a positive number"),
    currency: z.enum(["USD", "PEN", "EUR"]),
    description: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "deposit") {
      if (!data.destinationAccountId) {
        ctx.addIssue({
          code: "custom",
          message: "Destination account is required for deposits",
          path: ["destinationAccountId"],
        });
      }
      if (data.originAccountId) {
        ctx.addIssue({
          code: "custom",
          message: "Origin account should not be provided for deposits",
          path: ["originAccountId"],
        });
      }
    }

    if (data.type === "withdraw") {
      if (!data.originAccountId) {
        ctx.addIssue({
          code: "custom",
          message: "Origin account is required for withdrawals",
          path: ["originAccountId"],
        });
      }
      if (data.destinationAccountId) {
        ctx.addIssue({
          code: "custom",
          message: "Destination account should not be provided for withdrawals",
          path: ["destinationAccountId"],
        });
      }
    }

    if (data.type === "transfer") {
      if (!data.originAccountId || !data.destinationAccountId) {
        ctx.addIssue({
          code: "custom",
          message: "Both origin and destination accounts are required for transfers",
          path: ["originAccountId"],
        });
      } else if (data.originAccountId === data.destinationAccountId) {
        ctx.addIssue({
          code: "custom",
          message: "Origin and destination accounts must be different",
          path: ["destinationAccountId"],
        });
      }
    }
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type TransactionFormData = z.infer<typeof transactionSchema>;
