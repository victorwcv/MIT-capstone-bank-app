import { useMemo } from 'react';
import { useAccounts } from '@/hooks';
import { TotalBalance } from '@/components/TotalBalance';
import { LineChart } from '@/components/LineChart';
import { AccountCard } from '@/components/AccountCard';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';

export const Component = () => {
  const { data: accounts, isLoading, isError } = useAccounts();

  const total = useMemo(() => {
    if (!accounts) return 0;
    return accounts.reduce((sum, acc) => sum + acc.balance.amount, 0);
  }, [accounts]);

  const chartData = useMemo(() => {
    const days = 30;
    const base = total;
    const res = [];
    for (let i = days; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      res.push({
        day: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        amount: base + (Math.random() - 0.5) * 800,
      });
    }
    return res;
  }, [total]);

  if (isLoading) return <ProgressSpinner />;
  if (isError) return <Message severity="error" text="Failed to load accounts" />;

  return (
    <div>
      <TotalBalance amount={total} currency="USD" />
      <div className="grid mt-4">
        {accounts?.map((acc) => (
          <div key={acc.id} className="col-12 md:col-6 lg:col-4">
            <AccountCard account={acc} />
          </div>
        ))}
      </div>
      <div className="mt-5">
        <h3>Balance Trend (30 days)</h3>
        <LineChart data={chartData} />
      </div>
    </div>
  );
};