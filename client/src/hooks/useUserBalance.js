import { useSelector } from "react-redux";

export const useUserBalance = () => {
  const { data } = useSelector((state) => state.userData);

  const balance = data?.bankAccounts
    ?.map((account) => account.accountBalance)
    .reduce((prev, act) => prev + act, 0) || 0;

  return balance;
};