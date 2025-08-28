import { useState } from "react";

interface Transaction {
  date: string;
  description: string;
  type: "DEPÓSITO" | "RETIRO";
  amount: string;
}

type FilterType = "TODOS" | "DEPÓSITO" | "RETIRO";

// Datos de ejemplo
const allTransactions: Transaction[] = [
  { date: "15 Mar", description: "Depósito Nómina", type: "DEPÓSITO", amount: "+$2,400.00" },
  { date: "14 Mar", description: "Pago Tarjeta", type: "RETIRO", amount: "-$350.00" },
  { date: "12 Mar", description: "Supermercado", type: "RETIRO", amount: "-$180.00" },
  { date: "10 Mar", description: "Transferencia", type: "DEPÓSITO", amount: "+$500.00" },
  { date: "08 Mar", description: "Gasolinera", type: "RETIRO", amount: "-$200.00" },
  { date: "05 Mar", description: "Restaurante", type: "RETIRO", amount: "-$120.00" },
];

export const TransactionsPage = () => {
  const [filterType, setFilterType] = useState<FilterType>("TODOS");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const filteredTransactions = allTransactions
    .filter((tx) => filterType === "TODOS" || tx.type === filterType)
    .filter((tx) => tx.description.toLowerCase().includes(search.toLowerCase()));

  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  return (
    <>
      <div className="p-4 m-4 bg-white rounded-lg shadow flex flex-col md:flex-row gap-4 items-center">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as FilterType)}
          className="input input-bordered"
        >
          <option value="TODOS">Todos</option>
          <option value="DEPÓSITO">Depósito</option>
          <option value="RETIRO">Retiro</option>
        </select>

        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered flex-1"
        />

        <button onClick={() => setPage(1)}>Buscar</button>
      </div>

      <div className="m-4 overflow-x-auto shadow rounded-lg">
        <table className="table w-full bg-white  ">
          <thead>
            <tr>
              <th>FECHA</th>
              <th>DESCRIPCIÓN</th>
              <th>TIPO</th>
              <th>MONTO</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map((tx, idx) => (
              <tr key={idx}>
                <td>{tx.date}</td>
                <td>{tx.description}</td>
                <td>{tx.type}</td>
                <td>{tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="m-4 flex justify-center items-center bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i + 1)}>
              {i + 1}
            </button>
          ))}
          {page < totalPages && <button onClick={() => setPage(page + 1)}>Siguiente →</button>}
        </div>
      </div>
    </>
  );
};
