import { useMemo, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { useTransactions } from '@/hooks/useTransactions';
import { TxBadge } from '@/components/TxBadge';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { format } from 'date-fns';

export const Component = () => {
  const { data: txs, isLoading, isError } = useTransactions();
  const [dateRange, setDateRange] = useState<Date[] | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!txs) return [];
    return txs.filter((tx) => {
      const txDate = new Date(tx.date);
      const start = dateRange?.[0];
      const end = dateRange?.[1];
      const inRange = !start || !end || (txDate >= start && txDate <= end);
      const inCat = !category || tx.category === category;
      return inRange && inCat;
    });
  }, [txs, dateRange, category]);

  if (isLoading) return <ProgressSpinner />;
  if (isError) return <Message severity="error" text="Failed to load transactions" />;

  const categoryOptions = [
    { label: 'All', value: null },
    { label: 'Transfer', value: 'transfer' },
    { label: 'Top-up', value: 'topup' },
    { label: 'Payment', value: 'payment' },
    { label: 'Refund', value: 'refund' },
  ];

  return (
    <div>
      <div className="flex gap-3 mb-3 flex-wrap">
        <Calendar
          selectionMode="range"
          placeholder="Filter by date"
          value={dateRange}
          onChange={(e) => setDateRange(e.value as Date[])}
          showIcon
          readOnlyInput
        />
        <Dropdown
          options={categoryOptions}
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.value)}
        />
      </div>

      <DataTable
        value={filtered}
        paginator
        rows={10}
        rowHover
        removableSort
        emptyMessage="No transactions"
      >
        <Column
          field="date"
          header="Date"
          sortable
          body={(tx) => format(new Date(tx.date), 'MMM dd, yyyy')}
        />
        <Column field="description" header="Description" />
        <Column
          header="Amount"
          body={(tx) => <TxBadge tx={tx} />}
          style={{ width: '120px' }}
        />
        <Column
          field="status"
          header="Status"
          body={(tx) => <span className={`text-capitalize text-${tx.status}`}>{tx.status}</span>}
        />
      </DataTable>
    </div>
  );
};