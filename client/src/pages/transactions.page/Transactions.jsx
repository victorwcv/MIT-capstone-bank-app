import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import { signout } from "../../store/slices/userSlice";
import {
  fetchSucces,
  clearData,
} from "../../store/slices/userDataSlice";
import Layout from "../../layouts/Layout";

const transactionsOptions = [
  { path: "/transactions/deposit", label: "Deposit" },
  { path: "/transactions/withdrawal", label: "Withdrawal" },
  { path: "/transactions/bank-transfer", label: "Bank Transfer" },
  { path: "/transactions/pay-bills", label: "Pay Bills" },
  { path: "/transactions/new-bank-account", label: "New Bank Account" },
  { path: "/transactions/delete-bank-account", label: "Delete Bank Account" },
];

function Transactions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        let apiUrl = import.meta.env.VITE_API_URL;
        let link = `${apiUrl}/api/transaction/`;
        let options = {
          method: "GET",
          credentials: "include",
        };
        const response = await fetch(link, options);
        const data = await response.json();
        setLoading(false);
        if (data.statusCode === 401 || data.statusCode === 403) {
          console.log(data);
          dispatch(clearData());
          dispatch(signout());
          return;
        }
        dispatch(fetchSucces(data));
      } catch (error) {
        setLoading(false);
        setError('An error occured! Please try again later.');
      }
    };
    fetchData();
  }, []);

  console.log("rendering transactions!");

  return (
    <Layout>
      <div
        className={`flex items-center justify-center relative w-full min-h-[80vh] my-12 bg-neutral-100 shadow-lg`}
      >
        {location.pathname === "/transactions" ? (
          <div className="flex w-9/12 my-20 justify-center flex-wrap gap-6">
            {transactionsOptions.map((option, index) => {
              return (
                <Link to={option.path} key={index}>
                  <div className="flex justify-center items-center p-6 rounded-lg bg-[var(--secondary-color)] text-white text-2xl size-52 hover:scale-105 hover:shadow-xl xl:w-80 transition-transform">
                    <p className="text-center">{option.label}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <>
            <div className="absolute h-full left-0 flex flex-col justify-center gap-1 bg-[var(--secondary-color)]">
              {transactionsOptions.map((option, index) => {
                return (
                  <Link to={option.path} key={index}>
                    <div
                      className={`flex justify-center  items-center bg-[var(--secondary-color)] rounded-md text-white text-xl w-60 h-16  ${
                        location.pathname === option.path
                          ? "translate-x-10 border-2 border-neutral-800 shadow-xl"
                          : "hover:underline hover:underline-offset-8"
                      } transition-transform`}
                    >
                      <p className="text-center">{option.label}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="ml-60 w-full px-36">
              <Outlet />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Transactions;
