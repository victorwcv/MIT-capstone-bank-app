import { totalUserBalance } from "../utils/totalUserBalance";

function TotalUserBalance({ data }) {
  return (
    <>
      <div className="mb-6 mx-12 font-medium flex justify-between text-xl border-b-2">
        <h3>Current balance:</h3>
        <p>$ {totalUserBalance(data)}</p>
      </div>
    </>
  );
}

export default TotalUserBalance;
