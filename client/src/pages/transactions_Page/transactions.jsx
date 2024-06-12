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
import LoadingSpinner from "../../components/Loading";
import { useData } from "../../hooks/useData";

const transactionsOptions = [
  { path: "/transactions/deposit", label: "Deposit" },
  { path: "/transactions/withdrawal", label: "Withdrawal" },
];

function Transactions() {
  const { loading } = useData();
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
          console.log(data)
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

  if (loading) return <LoadingSpinner />;

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
                  <div className="flex justify-center items-center rounded-lg bg-[var(--secondary-color)] text-white text-2xl size-52 hover:scale-105 hover:shadow-xl transition-transform">
                    <p>{option.label}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <>
            <div className="absolute h-full left-0 flex justify-center   flex-col gap-1 bg-neutral-300">
              {transactionsOptions.map((option, index) => {
                return (
                  <Link to={option.path} key={index}>
                    <div
                      className={`flex justify-center shadow-lg items-center bg-[var(--secondary-color)] text-white text-lg w-52 py-3 ${
                        location.pathname === option.path ? "translate-x-3" : ""
                      } transition-transform`}
                    >
                      <p>{option.label}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="ml-52">
              <Outlet />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Transactions;

// <>
//   <section className="flex justify-center items-center min-h-[calc(100vh-65px)]">
//     <div className="container grid grid-cols-4 gap-3 p-3 h-[700px]">
//       <div className="bg-[var(--secondary-color)] text-white font-medium">
//         {transactionsOptions.map((transaction, index) => {
//           return (
//             <Link
//               to={transaction.path}
//               key={index}
//               className={`${
//                 location.pathname === transaction.path
//                   ? "bg-[#15151584] "
//                   : ""
//               } block w-full border-b-2  text-center text-xl py-6 hover:bg-[#15151584]`}
//             >
//               {transaction.label}
//             </Link>
//           );
//         })}
//       </div>

//       <div className="flex justify-center items-center bg-neutral-100 col-span-3 p-6 overflow-hidden">
//         <Outlet />
//       </div>
//     </div>
//   </section>
// </>
