import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

interface Props {
  amount: number;
  currency: string;
}

export const TotalBalance = ({ amount, currency }: Props) => {
  const [key, setKey] = useState(0);
  useEffect(() => setKey((k) => k + 1), [amount]);
  return (
    <div className="text-center py-4">
      <div className="text-500 text-sm">Total Balance</div>
      <div className="text-5xl font-bold text-primary mt-2" key={key}>
        <CountUp end={amount} decimals={2} prefix={`${currency} `} />
      </div>
    </div>
  );
};