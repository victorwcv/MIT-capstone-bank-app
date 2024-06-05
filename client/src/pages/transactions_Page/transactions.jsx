import { useState } from "react";
import Footer from "../../components/footer_Comp/footer";
import Deposit from "../../components/deposit_Comp/deposit";
import Withdrawal from "../../components/withdraw_Comp/withdrawal";

const transactionsOptions = [
  { id: "deposit", label: "Deposit" },
  { id: "withdrawal", label: "Withdrawal" },
];

const componentsMap = {
  deposit: <Deposit />,
  withdrawal: <Withdrawal />,
};

function Transactions() {
  const [panelPage, setPanelPge] = useState("deposit");

  console.log("rendering!");

  const handleClick = (e) => {
    setPanelPge(e.target.id);
    console.log("You are ", e.target.id);
  };

  return (
    <>
      <section className="flex justify-center items-center min-h-[calc(100vh-65px)]">
        <div className="container grid grid-cols-4 gap-3 p-3 h-[700px]">
          <div className="bg-[var(--secondary-color)] text-white font-medium">
            {transactionsOptions.map((transaction, index) => {
              return (
                <button
                  key={index}
                  onClick={handleClick}
                  id={transaction.id}
                  className={`${
                    panelPage === transaction.id
                      ? "bg-[#15151584] border-l-8"
                      : ""
                  } block w-full text-center text-xl py-6 hover:bg-[#15151584]`}
                >
                  {transaction.label}
                </button>
              );
            })}
          </div>

          <div className="flex justify-center items-center bg-neutral-100 col-span-3">
            {componentsMap[panelPage]}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Transactions;
