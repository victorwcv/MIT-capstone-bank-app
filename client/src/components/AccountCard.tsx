import { Card } from "primereact/card";
import type { Account } from "@/types";

interface Props {
  account: Account;
}

export const AccountCard = ({ account }: Props) => (
  <Card className="shadow-2 border-round-xl">
    <div className="flex justify-content-between align-items-center">
      <div>
        <div className="text-sm text-500">{account.name}</div>
        <div className="text-xl font-bold">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: account.balance.currency,
          }).format(account.balance.amount)}
        </div>
        <div className="text-600 text-sm mt-1">{account.number}</div>
      </div>
      <i className={`pi pi-credit-card text-3xl text-primary`} />
    </div>
  </Card>
);
