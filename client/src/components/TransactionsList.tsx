import { Link } from "react-router";

export interface Transaction {
  type: "Depósito" | "Retiro";
  description: string;
  amount: string;
  date: string;
}

interface TransactionsListProps {
  transactions: Transaction[];
}

export const TransactionsList = ({ transactions }: TransactionsListProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-2">
      <h2 className="font-bold mb-2">Últimas Transacciones</h2>
      {transactions.map((tx, idx) => (
        <div key={idx} className="flex justify-between">
          <div>
            <span className="font-semibold">{tx.type}</span> {tx.description}
          </div>
          <div>{tx.amount}</div>
          <div className="text-gray-400 text-sm">{tx.date}</div>
        </div>
      ))}
      <Link to="/transactions"  className="text-blue-600 mt-2 hover:underline self-start">Ver todas →</Link>
    </div>
  );
};
