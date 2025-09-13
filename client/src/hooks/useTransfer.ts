import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTransfer } from '@/services/wallet.service';

export const useTransfer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createTransfer,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['accounts'] });
      qc.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};