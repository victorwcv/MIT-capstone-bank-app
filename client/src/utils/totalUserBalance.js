import { addMoney } from "./moneyOperations";

export const totalUserBalance = (data) => {

  const balance = data?.bankAccounts
    ?.map((account) =>  account.accountBalance)
    .reduce((prev, act) => addMoney(prev, act), 0) || 0;

  return balance;
};