export interface AccountResponse {
  data: Account[];
  success: boolean;
  message: string;
}

export interface Account {
  _id: string;
  ownerId: string;
  accountName: string;
  alias: null;
  accountNumber: string;
  currency: "USD" | "PEN" | "EUR";
  balance: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
