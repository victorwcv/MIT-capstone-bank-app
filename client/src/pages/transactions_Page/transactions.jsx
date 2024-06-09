import { useEffect, useState } from "react";
import Footer from "../../components/footer_Comp/footer";
import Deposit from "../../components/deposit_Comp/deposit";
import Withdrawal from "../../components/withdraw_Comp/withdrawal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStart,
  fetchSucces,
  fetchFailure,
} from "../../store/slices/userDataSlice";
import { fetchData } from "../../utils/fetchData";
import Loading from "../../components/loading_Comp/loading";

const transactionsOptions = [
  { id: "deposit", label: "Deposit" },
  { id: "withdrawal", label: "Withdrawal" },
];

function Transactions() {
  const { data, loading, error } = useSelector((state) => state.userData);
  const [panelPage, setPanelPage] = useState("deposit");
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      try {
        dispatch(fetchStart());
        const data = await fetchData(
          "http://localhost:3000/api/user/transactions/user-data",
          { method: "GET", credentials: "include" }
        );
        dispatch(fetchSucces(data));
        console.log("User data fetched correctly!", data);
      } catch (error) {
        dispatch(fetchFailure());
        console.error("Eror loading data:", error);
      }
    };
    loadData();
  }, [dispatch]);

  console.log("rendering transactions!");

  const handleClick = (e) => {
    setPanelPage(e.target.id);
  };

  const componentsMap = {
    deposit: <Deposit data={data} />,
    withdrawal: <Withdrawal data={data} />,
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
            {loading ? <Loading /> : componentsMap[panelPage]}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Transactions;
