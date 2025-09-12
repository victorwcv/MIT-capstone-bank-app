import { Tag } from 'primereact/tag';
import type { Transaction } from '@/types';
import { statusSeverity } from '@/utils/txHelpers';

interface Props {
  tx: Transaction;
}

export const TxBadge = ({ tx }: Props) => (
  <Tag
    value={`${tx.direction === 'in' ? '+' : '-'}$${tx.amount.amount.toFixed(2)}`}
    severity={tx.direction === 'in' ? 'success' : 'danger'}
    rounded
  />
);