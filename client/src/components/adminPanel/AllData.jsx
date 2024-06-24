import { useEffect, useState } from "react";

function AllData() {
  const [usersData, setUsersData] = useState(null);
  console.log(usersData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const link = "http://localhost:3000/api/admin/all-data";
        const options = {
          method: "GET",
          credentials: "include",
        };
        const response = await fetch(link, options);
        const data = await response.json();
        setUsersData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function userBalance(user) {

    const balance = user?.bankAccounts
      ?.map((account) => account.accountBalance)
      .reduce((prev, act) => prev + act, 0) || 0;
  
    return balance;
  
  }

  return (
    <>
      <div className={`flex flex-col h-[600px] mx-5 space-y-2 overflow-auto`}>
        
        <table
          className={`${usersData === null ? "hidden" : ""} w-full shadow-md`}
        >
          <thead className="bg-[#EBECF0] dark:bg-dark-eval-2">
            <tr className="text-center font-medium text-gray-700">
              <th className="py-3">ID</th>
              <th className="py-3">Role</th>
              <th className="py-3">Name</th>
              <th className="py-3">Email</th>
              <th className="py-3">Phone Number</th>
              <th className="py-3">Address</th>
              <th className="py-3">Total Balance</th>
            </tr>
          </thead>
          <tbody className="text-left divide-y divide-gray-200 dark:divide-dark-eval-2">
            <tr></tr>
            {usersData &&
              usersData.map((user, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white cursor-pointer hover:bg-yellow-300 "
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3">{user.username}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.phone}</td>
                    <td className="p-3">{user.address}</td>
                    <td className="p-3 text-right">$ {userBalance(user.banking)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AllData;


