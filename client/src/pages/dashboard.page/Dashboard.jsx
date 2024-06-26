import { useEffect } from "react";
import { useData } from "../../hooks/useData";
import { useUser } from "../../hooks/useUser";
import Layout from "../../layouts/Layout";
import { useDispatch } from "react-redux";
import {
  fetchSucces,
  clearData,
} from "../../store/slices/userDataSlice";
import { signout } from "../../store/slices/userSlice";
import { totalUserBalance } from "../../utils/totalUserBalance";

function Dashboard() {
  const { currentUser } = useUser();
  const { data } = useData();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchStart());
        let apiUrl = import.meta.env.VITE_API_URL;
        let link = `${apiUrl}/api/transaction/`;
        let options = {
          method: "GET",
          credentials: "include",
        };
        const response = await fetch(link, options);
        const data = await response.json();
        if (data.statusCode === 401 || data.statusCode === 403) {
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

  const userInfo = [
    { label: "User ID", value: currentUser?._id },
    { label: "User name", value: currentUser?.username },
    { label: "Email", value: currentUser?.email },
    { label: "Phone Number", value: currentUser?.phone },
    { label: "Address", value: currentUser?.address },
  ];

  console.log("rendering Dashboard!!");
  return (
    <Layout>
      <div className="bg-neutral-100 w-full my-10 p-10 shadow-xl">
        <div className="flex w-full justify-around font-bold text-3xl my-5 ">
          <h2>{currentUser?.username}</h2>
          <h2>
            <span>Total Balance:</span> $ {totalUserBalance(data)}
          </h2>
        </div>
        <div className="xl:mx-20">
          <section className="my-12">
            <h3 className="text-xl font-medium m-6">User Bank Accounts:</h3>
            {data?.bankAccounts?.map((acc, index) => {
              return (
                <article
                  key={index}
                  className="flex justify-between border-b-2 mx-12 my-6"
                >
                  <p>{acc.bankAccountNumber}</p>
                  <p>$ {acc.accountBalance}</p>
                </article>
              );
            })}
          </section>
          <section>
            <h3 className="text-xl font-medium m-6">User Information:</h3>
            {userInfo.map((info, index) => {
              return (
                <article
                  key={index}
                  className="flex justify-between mx-12 mb-6 border-b-2"
                >
                  <p className="font-medium">{info.label}:</p>
                  <p>{info.value || "-"}</p>
                </article>
              );
            })}
          </section>
          <section className="my-12">
            <h3 className="text-xl font-medium m-6">Latest transactions:</h3>
            <div className="mx-12 relative overflow-auto max-h-96">
              <table className="w-full">
                <thead className="bg-[var(--secondary-color)] sticky top-0">
                  <tr className="text-center font-medium text-gray-700">
                    <th className="py-3 text-white ">N</th>
                    <th className="py-3 text-white ">Transaction</th>
                    <th className="py-3 text-white ">Origin </th>
                    <th className="py-3 text-white ">Destination </th>
                    <th className="py-3 text-white ">Amount</th>
                    <th className="py-3 text-white ">Date</th>
                    <th className="py-3 text-white ">Time</th>
                    <th className="py-3 text-white ">Description</th>
                  </tr>
                </thead>
                <tbody className="text-left divide-y divide-gray-200 dark:divide-dark-eval-2">
                  {data?.transactions?.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-center py-6">
                        No transactions found
                      </td>
                    </tr>
                  )}
                  {data?.transactions
                    ?.slice(-20)
                    .reverse()
                    .map((transaction, index) => {
                      return (
                        <tr
                          key={index}
                          className=" hover:bg-yellow-200 cursor-pointer text-center"
                          title={`Transaction ID: ${transaction._id}`}
                        >
                          <td className="p-3">{index + 1}</td>
                          <td className="p-3">{transaction?.type}</td>
                          <td className="p-3">{transaction?.originAccount}</td>
                          <td className="p-3">
                            {transaction?.type === "bill payment"
                              ? transaction?.provider
                              : transaction?.destinationAccount}
                          </td>
                          <td className="p-3">$ {transaction?.amount}</td>
                          <td className="p-3">
                            {transaction?.transactionDate}
                          </td>
                          <td className="p-3">
                            {transaction?.transactionTime}
                          </td>
                          <td className="p-3">
                            {transaction?.description || "No description"}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
