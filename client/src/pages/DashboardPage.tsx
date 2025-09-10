import { ArrowUpRight, ArrowDownToLine, CirclePlus, BadgeMinus, BadgePlus } from "lucide-react";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";

interface Transaction {
  id: number;
  name: string;
  amount: number;
  type: "out" | "in";
}

export const DashboardPage = () => {
  const lastTransactions: Transaction[] = [
    { id: 1, name: "John Doe", amount: 1000, type: "in" },
    { id: 2, name: "Apple inc", amount: 500, type: "out" },
    { id: 3, name: "Juan C.", amount: 1000, type: "in" },
    { id: 4, name: "Tottus", amount: 500, type: "out" },
    { id: 5, name: "Recharge", amount: 1000, type: "in" },
  ];

  const setBadge = (type: "in" | "out") => {
    if (type === "in") {
      return <BadgePlus size={24} />;
    } else {
      return <BadgeMinus size={24} />;
    }
  };

  const setClassName = (type: "in" | "out") => {
    if (type === "in") {
      return "bg-green-100 text-green-800";
    } else {
      return "bg-red-100 text-red-800";
    }
  };

  const itemTemplate = (transaction: Transaction, index: number) => {
    return (
      <div className="flex justify-between p-3 border-b border-gray-200 text-xl" key={index}>
        <div className="flex items-center gap-2">
          <div className={`p-1 rounded-full  ${setClassName(transaction.type)}`}>{setBadge(transaction.type)}</div>
          <div>{transaction.name}</div>
        </div>
        <div className="font-semibold">{transaction.amount}.00 PEN</div>
      </div>
    );
  };

  const listTemplate = (items: Transaction[]) => {
    if (!items || items.length === 0) return null;

    const list = items.map((product, index) => {
      return itemTemplate(product, index);
    });

    return <div className="grid grid-nogutter">{list}</div>;
  };

  return (
    <>
      <div className="mb-4">
        <h2 className="text-5xl font-bold">2,150.00 PEN</h2>
        <small className="text-gray-400">Current Balance</small>
      </div>

      {/* Actions */}
      <div className="flex gap-4 my-6">
        <Button severity="info" className="flex-1 h-24 flex flex-col justify-center items-center">
          <ArrowUpRight size={40} />
          <p className="text-center">Send</p>
        </Button>
        <Button severity="help" className="flex-1 h-24 flex flex-col justify-center items-center">
          <ArrowDownToLine size={40} />
          <p className="text-center">Receive</p>
        </Button>
        <Button
          severity="success"
          className="flex-1 h-24 flex flex-col justify-center items-center"
        >
          <CirclePlus size={40} />
          <p className="text-center">Add</p>
        </Button>
      </div>

      <div>
        <h2 className="text-2xl font-bold my-4">Transactions</h2>
        <div className="card">
          <DataView value={lastTransactions} listTemplate={listTemplate} />
        </div>
      </div>
    </>
  );
};
