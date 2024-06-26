import { totalUserBalance } from "../utils/totalUserBalance";

function TotalUserBalance({ userAccounts }) {
  return (
    <>
      <div className="mb-6 mx-12 font-medium flex justify-between text-xl border-b-2">
        <h3>Current balance:</h3>
        <p>$ {totalUserBalance(userAccounts)}</p>
      </div>
    </>
  );
}

export default TotalUserBalance;
