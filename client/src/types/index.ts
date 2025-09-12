// /src/types/index.ts
export type Currency = 'USD' | 'EUR' | 'GBP' | 'MXN';

export interface Money {
  amount: number;
  currency: Currency;
}

export interface Account {
  id: string;
  name: string;
  number: string; // masked
  balance: Money;
  type: 'checking' | 'savings' | 'card';
  brand?: 'visa' | 'mastercard';
  exp?: string; // MM/YY
}

export interface Transaction {
  id: string;
  date: string; // ISO
  description: string;
  amount: Money;
  direction: 'in' | 'out';
  status: 'completed' | 'pending' | 'failed';
  category: 'transfer' | 'topup' | 'payment' | 'refund';
  counterpart?: {
    name: string;
    account: string;
  };
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
}

// DTOs
export interface TransferDto {
  fromAccountId: string;
  to: string; // email | iban
  amount: Money;
  note?: string;
}