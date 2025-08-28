import {
  BalanceCard,
  MonthlySummary,
  TransactionsList,
  type Transaction,
} from "@/components";

const transactions: Transaction[] = [
  { type: "Depósito", description: "Salario", amount: "+$500.00", date: "15 Mar" },
  { type: "Retiro", description: "Supermercado", amount: "-$150.00", date: "12 Mar" },
  { type: "Depósito", description: "Transferencia", amount: "+$200.00", date: "10 Mar" },
];

export const DashboardPage = () => {
  return (
    <>
      <div className="flex gap-4 m-4">
        <BalanceCard title="BALANCE" amount="$2,450.00" subtitle="+12% este mes" />
        <BalanceCard title="DEPÓSITO" amount="+$3,200" subtitle="este mes" />
        <BalanceCard title="RETIRO" amount="-$1,800" subtitle="este mes" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
        <TransactionsList transactions={transactions} />
        <MonthlySummary deposits="+$3,200" withdrawals="-$1,800" net="+$1,400" />
      </div>
    </>
  );
};
