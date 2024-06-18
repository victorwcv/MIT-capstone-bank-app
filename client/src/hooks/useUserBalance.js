import { useSelector } from "react-redux";

export const useUserBalance = () => {
  const { data } = useSelector((state) => state.userData);

  if (!data) return 0;

  const balance = data?.bankAccounts
    ?.map((account) => account.accountBalance)
    .reduce((prev, act) => prev + act, 0) || 0;

  return balance;
};
