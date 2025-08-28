interface MonthlySummaryProps {
  deposits: string;
  withdrawals: string;
  net: string;
}

export const MonthlySummary = ({ deposits, withdrawals, net }: MonthlySummaryProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-2">
      <h2 className="font-bold mb-2">Resumen Mensual</h2>
      <div>Depósitos: {deposits}</div>
      <div>Retiros: {withdrawals}</div>
      <div className="font-semibold">NETO: {net}</div>
    </div>
  );
};
