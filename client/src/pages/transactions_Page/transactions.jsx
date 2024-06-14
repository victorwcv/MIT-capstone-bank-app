import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import { signout } from "../../store/slices/userSlice";
import {
  fetchStart,
  fetchSucces,
  fetchFailure,
  clearData,
} from "../../store/slices/userDataSlice";
import Layout from "../../layouts/Layout";

const transactionsOptions = [
  { path: "/transactions/new-bank-account", label: "New Bank Account" },
  { path: "/transactions/deposit", label: "Deposit" },
  { path: "/transactions/withdrawal", label: "Withdrawal" },
  { path: "/transactions/bank-transfer", label: "Bank Transfer" },
  { path: "/transactions/pay-bills", label: "Pay Bills" },
  { path: "/transactions/cards", label: "Cards" },
];

function Transactions() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchStart());
        let link = "http://localhost:3000/api/user/transactions/user-data";
        let options = {
          method: "GET",
          credentials: "include",
        };
        const response = await fetch(link, options);
        const data = await response.json();
        if (data.statusCode === 401 || data.statusCode === 403) {
          console.log(data);
          dispatch(clearData());
          dispatch(signout());
          return;
        }
        dispatch(fetchSucces(data));
      } catch (error) {
        dispatch(fetchFailure(error));
      }
    };
    fetchData();
  }, []);

  console.log("rendering transactions!");

  return (
    <Layout>
      <div
        className={`flex items-center justify-center relative w-full min-h-[80vh] my-12   bg-neutral-100`}
      >
        {location.pathname === "/transactions" ? (
          <div className="flex w-full justify-center flex-wrap gap-6">
            {transactionsOptions.map((option, index) => {
              return (
                <Link to={option.path} key={index}>
                  <div className="flex justify-center items-center p-6 rounded-lg bg-[var(--secondary-color)] text-white text-2xl size-52 hover:scale-105 hover:shadow-xl transition-transform">
                    <p className="text-center">{option.label}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <>
            <div className="absolute w-full top-0 flex justify-center gap-1">
              {transactionsOptions.map((option, index) => {
                return (
                  <Link to={option.path} key={index}>
                    <div
                      className={`flex justify-center  items-center bg-[var(--secondary-color)] text-white text-xl w-52 h-16 ${
                        location.pathname === option.path
                          ? "scale-110 shadow-xl"
                          : ""
                      } transition-transform`}
                    >
                      <p className="text-center">{option.label}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="mt-16">
              <Outlet />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Transactions;
