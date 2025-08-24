import { Account, type IAccount } from "@/models";


export const createAccount = async (accountData: Partial<IAccount>): Promise<IAccount> => {
  const account = new Account(accountData);
  await account.save();
  return account;
}

export const getAccountById = async (accountId: string): Promise<IAccount | null> => {
  return await Account.findById(accountId);
}

export const getUserAccounts = async (userId: string): Promise<IAccount[]> => {
  return await Account.find({ ownerId: userId });
}



