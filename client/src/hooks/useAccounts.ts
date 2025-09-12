import { useQuery } from "@tanstack/react-query";
import { fetchAccounts } from "@/services/wallet.service";

export const useAccounts = () =>
  useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
  });
