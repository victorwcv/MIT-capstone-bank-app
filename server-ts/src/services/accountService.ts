import { Account, type IAccount } from "@/models";


export const createAccount = async (accountData: Partial<IAccount>): Promise<IAccount> => {
  const account = new Account(accountData);
  await account.save();
  return account;
}

