import AllData from "../../components/adminPanel/AllData";
import { useState } from "react";
import CreateNewAdmin from "../../components/adminPanel/CreateNewAdmin";
import Footer from "../../components/footer_Comp/Footer";

const adminOptions = [
  {
    title: "All Data",
    id: "all-data",
  },
  {
    title: "Create New Admin",
    id: "new-admin",
  },
  {
    title: "User Details",
    id: "user-details",
  },
  {
    title: "Delete Users",
    id: "delete-users",
  },
];

function AdminPanel() {
  const [panelPage, SetPanelPge] = useState("all-data");

  console.log("rendering!");

  const handleClick = (e) => {
    e.preventDefault();
    SetPanelPge(e.target.id);
  };
  return (
    <>
      <section className="flex flex-col min-h-[calc(100vh-65px)]">
        <h1 className="text-center text-4xl font-bold my-10">Admin Panel</h1>
        <div className="container mx-auto grid grid-cols-4 gap-3 p-3 h-[700px]">
          <div className="bg-neutral-100">
            {adminOptions.map((option, index) => {
              return (
                <button
                  key={index}
                  onClick={handleClick}
                  id={option.id}
                  className={`${
                    panelPage === option.id ? "bg-neutral-200" : ""
                  } block w-full text-center text-xl py-6 hover:bg-neutral-200`}
                >
                  {option.title}
                </button>
              );
            })}
          </div>

          <div className="bg-neutral-200 col-span-3">
            {panelPage === "all-data" ? (
              <AllData />
            ) : panelPage === "create" ? (
              <CreateNewAdmin />
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default AdminPanel;
