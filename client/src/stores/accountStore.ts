import type { Account } from "@/types/accountResponse";
import { create } from "zustand";

interface AccountState {
  accounts: Account[];
  setAccounts: (accounts: Account[]) => void;
  updateAccount: (accountId: string, updatedAccount: Partial<Account>) => void;
}

export const useAccountStore = create<AccountState>()((set) => ({
  accounts: [],
  setAccounts: (accounts) => set({ accounts }),
  updateAccount: (accountId, updatedAccount) =>
    set((state) => ({
      accounts: state.accounts.map((account) =>
        account._id === accountId ? { ...account, ...updatedAccount } : account
      ),
    })),
}));
