import { useState } from "react";

function AllData() {
  const [data, setData] = useState(null);

  const handleClick = (e) => {
    try {
      fetch("http://localhost:3000/api/all-users")
        .then((res) => res.json())
        .then((data) => {
          console.log("Successful data retrieval: ", data);
          setData(data);
        });
    } catch (error) {
      alert(error.message ?? "Somenthing went wrong");
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
        <button onClick={()=> setData(null)} className="px-6 py-3 w-40 rounded-full text-white bg-[var(--secondary-color)]">
          Clear
        </button>
      </div>
      <div
        className={`${
          !data ? "hidden" : ""
        } flex flex-col mx-5 space-y-2 overflow-auto`}
      >
        <table className="w-full shadow-md">
          <thead className="bg-[#EBECF0] dark:bg-dark-eval-2">
            <tr className="text-center font-medium text-gray-700">
              <th className="py-3">ID</th>
              <th className="py-3">Name</th>
              <th className="py-3">Email Address</th>
              <th className="py-3">Phone Number</th>
              <th className="py-3">Adress</th>
              <th className="py-3">Total Balance</th>
            </tr>
          </thead>
          <tbody className="text-left divide-y divide-gray-200 dark:divide-dark-eval-2">
            {/* Replace with data fetched from server */}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AllData;
