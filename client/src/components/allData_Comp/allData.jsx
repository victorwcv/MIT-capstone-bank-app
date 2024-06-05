import { useState } from "react";

function AllData() {
  const [usersData, setUsersData] = useState(null);
  console.log(usersData);

  const handleClick = (e) => {
    try {
      fetch("http://localhost:3000/api/admin/all-data", {
        method: "GET",
        credentials: "include", // Incluir cookies en la solicitud
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Bad Request");
          }
          return res.json();
        })
        .then((data) => {
          setUsersData(data);
        });
    } catch (error) {
      alert(error.message ?? "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex justify-center p-4 items-center gap-10">
        <button
          onClick={handleClick}
          className="px-6 py-3 w-40 rounded-full text-white bg-[var(--secondary-color)]"
        >
          Show All Data
        </button>
        <button
          onClick={() => setUsersData(null)}
          className="px-6 py-3 w-40 rounded-full text-white bg-[var(--secondary-color)]"
        >
          Clear
        </button>
      </div>
      <div className={` flex flex-col mx-5 space-y-2 overflow-auto`}>
        <table className="w-full shadow-md">
          <thead className="bg-[#EBECF0] dark:bg-dark-eval-2">
            <tr className="text-center font-medium text-gray-700">
              <th className="py-3">ID</th>
              <th className="py-3">Name</th>
              <th className="py-3">Email</th>
              <th className="py-3">Phone Number</th>
              <th className="py-3">Address</th>
              <th className="py-3">Total Balance</th>
            </tr>
          </thead>
          <tbody className="text-left divide-y divide-gray-200 dark:divide-dark-eval-2">
            <tr>
              <td
                colSpan="6"
                className={`${
                  usersData !== null ? "hidden" : ""
                } p-3 text-center`}
              >
                No hay datos
              </td>
            </tr>
            {usersData &&
              usersData.map((user, index) => {
                return (
                  <tr key={index}>
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{user.username}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.phone}</td>
                    <td className="p-3">{user.address}</td>
                    <td className="p-3 text-right">{user.balance || 0}</td>
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
