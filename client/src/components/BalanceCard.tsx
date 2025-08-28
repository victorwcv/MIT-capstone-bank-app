interface BalanceCardProps {
  title: string;
  amount: string;
  subtitle: string;
}

export const BalanceCard = ({ title, amount, subtitle }: BalanceCardProps) => {
  return (
    <div className="flex-1 bg-white p-4 rounded-lg shadow flex flex-col">
      <span className="text-gray-500">{title}</span>
      <span className="text-2xl font-bold">{amount}</span>
      <span className="text-sm text-gray-400">{subtitle}</span>
    </div>
  );
};
