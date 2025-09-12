import { useQuery } from '@tanstack/react-query';
import { fetchTransactions } from '@/services/wallet.service';

export const useTransactions = () =>
  useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });