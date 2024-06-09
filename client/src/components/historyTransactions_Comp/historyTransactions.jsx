import { useSelector, useDispatch } from "react-redux";

function HistoryTransactions() {
  const { data } = useSelector((state) => state.userData);

  return (
    <div className="h-full relative overflow-auto">
      {data && (
        <table
          className={`shadow-md `}
        >
          <thead className="bg-[#EBECF0] dark:bg-dark-eval-2 sticky top-0">
            <tr className="text-center font-medium text-gray-700">
              <th className="py-3">Transaction ID</th>
              <th className="py-3">Type</th>
              <th className="py-3">Origin/Desti Account</th>
              <th className="py-3">Amount</th>
              <th className="py-3">Date</th>
              <th className="py-3">Time</th>
              <th className="py-3">Description</th>
            </tr>
          </thead>
          <tbody className="text-left divide-y divide-gray-200 dark:divide-dark-eval-2">
            <tr></tr>
            {
              data.transactions?.slice(-20).reverse().map((transaction, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white cursor-pointer hover:bg-yellow-300 "
                  >
                    <td className="p-3">{transaction._id}</td>
                    <td className="p-3">{transaction.type}</td>
                    <td className="p-3 text-right">{transaction.originAccount || transaction.destinationAccount}</td>
                    <td className="p-3">{transaction.amount}</td>
                    <td className="p-3">{transaction.transactionDate}</td>
                    <td className="p-3">{transaction.transactionTime}</td>
                    <td className="p-3">{transaction.description || "No description"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HistoryTransactions;
