import { CustomBlock } from "@/components/ui";
import { List } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "@/services";
import { useTransactionStore } from "@/stores";
import { useAuthStore } from "@/stores";
import { fromCents } from "@/utils/utils";

export const TransactionsPage = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const setTransactions = useTransactionStore((state) => state.setTransactions);
  const transactions = useTransactionStore((state) => state.transactions);
  const userId = useAuthStore((state) => state.user?.id) || "";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["transactions", userId, page],
    queryFn: () => getTransactions(userId, page, itemsPerPage),
    enabled: !!userId,
  });

  useEffect(() => {
    console.log(data);
    if (transactions?.length !== data?.data.length) {
      setTransactions(data?.data);
    }
  }, [data, setTransactions, transactions]);


  console.log(data?.meta.total, itemsPerPage);
  const hasNext = data?.meta.total === itemsPerPage;
  const hasPrev = page > 1;

  if (isLoading) return <CustomBlock>Cargando transacciones...</CustomBlock>;
  if (isError) return <CustomBlock>Error: {(error as Error).message}</CustomBlock>;

  return (
    <>
      <CustomBlock>
        <h2 className="text-2xl font-bold flex items-center gap-2 uppercase">
          <List size={24} />
          Mis Transacciones
        </h2>
      </CustomBlock>

      <CustomBlock>
        <table className="table w-full bg-white">
          <thead>
            <tr>
              <th>CUENTA</th>
              <th>FECHA</th>
              <th>DESCRIPCIÓN</th>
              <th>TIPO</th>
              <th>MONTO</th>
            </tr>
          </thead>
          <tbody>
            {transactions &&
              transactions.map((tx, idx) => (
                <tr key={tx.id || idx}>
                  <td>{tx.userAccountId || "Sin origen"}</td>
                  <td>
                    {new Date(tx.createdAt).toLocaleDateString("es-PE", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }) || "Sin fecha"}
                  </td>
                  <td>{tx.description || "-"}</td>
                  <td>{tx.type}</td>
                  <td>
                    {fromCents(tx.amount)} {tx.currency}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </CustomBlock>

      {/* Paginación */}
      <CustomBlock>
        <div className="flex justify-center mt-4 gap-2">
          <button
            className="btn btn-primary"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={!hasPrev || isLoading}
          >
            Anterior
          </button>
          <span className="flex items-center px-4">Página {page}</span>
          <button
            className="btn btn-primary"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={hasNext || isLoading}
          >
            Siguiente
          </button>
        </div>
      </CustomBlock>
    </>
  );
};
