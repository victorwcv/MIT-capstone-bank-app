import { useUserBalance } from "../hooks/useUserBalance";

function TotalUserBalance() {
  const userBalance = useUserBalance();
  return (
    <>
      <div className="mb-6 mx-12 font-medium flex justify-between text-xl border-b-2">
        <h3>Current balance:</h3>
        <p>$ {userBalance}</p>
      </div>
    </>
  );
}

export default TotalUserBalance;
