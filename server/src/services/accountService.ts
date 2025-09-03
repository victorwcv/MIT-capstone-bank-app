import { Account, type IAccount } from "@/models";
import { CurrencyType } from "@/types/types";
import { createAccountNumber } from "@/utils";

export const createAccount = async (
  userId: string,
  accountData?: Partial<IAccount>,
): Promise<IAccount> => {
  const newAccount = {
    ownerId: userId,
    accountName: "Cuenta Digital",
    alias: null,
    accountNumber: createAccountNumber(),
    currency: "PEN",
    balance: 0,
    ...accountData,
  };
  const account = new Account(newAccount);
  await account.save();
  return account;
};

export const getAccountById = async (accountId: string): Promise<IAccount | null> => {
  return await Account.findById(accountId);
};

export const getUserAccounts = async (userId: string): Promise<IAccount[]> => {
  return await Account.find({ ownerId: userId });
};

export const deposit = async (
  accountId: string,
  amount: number,
  currency: CurrencyType
): Promise<IAccount> => {
  const account = await Account.findById(accountId);
  if (!account) {
    throw new Error("Account not found");
  }
  if (account.currency !== currency) {
    throw new Error("Invalid currency");
  }
  account.balance += amount;
  await account.save();
  return account;
};
