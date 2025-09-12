import type { Transaction } from '@/types';

export const categoryLabel: Record<Transaction['category'], string> = {
  transfer: 'Transfer',
  topup: 'Top-up',
  payment: 'Payment',
  refund: 'Refund',
};

export const statusSeverity: Record<Transaction['status'], 'success' | 'warning' | 'danger'> = {
  completed: 'success',
  pending: 'warning',
  failed: 'danger',
};