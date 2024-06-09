import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/footer_Comp/footer";
import {
  fetchEnd,
  fetchSucces,
  fetchFailure,
} from "../../store/slices/userDataSlice";

const transactionsOptions = [
  { path: "/transactions/deposit", label: "Deposit" },
  { path: "/transactions/withdrawal", label: "Withdrawal" },
  { path: "/transactions/history", label: "Last Transactions" },
];

function Transactions() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let link = "http://localhost:3000/api/user/transactions/user-data";
        let options = {
          method: "GET",
          credentials: "include",
        };
        const response = await fetch(link, options);
        const data = await response.json();
        console.log(data);
        dispatch(fetchSucces(data));
      } catch (error) {
        dispatch(fetchFailure(error));
      } finally {
        dispatch(fetchEnd());
      }
    };
    fetchData();
  }, []);

  console.log("rendering transactions!");

  return (
    <>
      <section className="flex justify-center items-center min-h-[calc(100vh-65px)]">
        <div className="container grid grid-cols-4 gap-3 p-3 h-[700px]">
          <div className="bg-[var(--secondary-color)] text-white font-medium">
            {transactionsOptions.map((transaction, index) => {
              return (
                <Link
                  to={transaction.path}
                  key={index}
                  className={`${
                    location.pathname === transaction.path
                      ? "bg-[#15151584] "
                      : ""
                  } block w-full border-b-2  text-center text-xl py-6 hover:bg-[#15151584]`}
                >
                  {transaction.label}
                </Link>
              );
            })}
          </div>

          <div className="flex justify-center items-center bg-neutral-100 col-span-3 p-6 overflow-hidden">
            <Outlet />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Transactions;
