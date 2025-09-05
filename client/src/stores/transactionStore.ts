import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface TransactionState {
  transactions: any[] | null;
  setTransactions: (transactions: any[]) => void;
  reset: () => void;
}

export const useTransactionStore = create<TransactionState>()(
  devtools(
    (set) => ({
      transactions: null,
      setTransactions: (transactions) => set({ transactions }),
      reset: () => set({ transactions: null }),
    }),
    { name: "account-store" }
  )
); 
