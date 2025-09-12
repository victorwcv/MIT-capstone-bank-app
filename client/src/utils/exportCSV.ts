import type { Transaction } from '@/types';

export const exportCSV = (txs: Transaction[]) => {
  const headers = ['Date', 'Description', 'Amount', 'Currency', 'Category', 'Status'];
  const rows = txs.map((t) => [
    t.date,
    t.description,
    t.direction === 'in' ? t.amount.amount : -t.amount.amount,
    t.amount.currency,
    t.category,
    t.status,
  ]);
  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `transactions_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};