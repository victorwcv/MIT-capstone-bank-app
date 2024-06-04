import AllData from "../../components/allData_Comp/allData";
import { useState } from "react";
import CreateNewAdmin from "../../components/createNewAdmin_Comp/createNewAdmin";
import Footer from "../../components/footer_Comp/footer";

function AdminPanel() {
  const [panelPage, SetPanelPge] = useState("all-data");
  console.log("rendering!");
  const handleClick = (e) => {
    e.preventDefault();
    SetPanelPge(e.target.id);
  }
  return (
    <>
    <section className="flex flex-col min-h-[calc(100vh-65px)]">
      <h1 className="text-center text-4xl font-bold my-10">Admin Panel</h1>
      <div className="container mx-auto grid grid-cols-4 gap-3 p-3 h-[700px]">
        <div className="bg-neutral-100">
          <button onClick={handleClick} id="all-data" className="block w-full text-center text-xl py-6 hover:bg-neutral-200">
            All Data
          </button>
          <button onClick={handleClick} id="create" className="block w-full text-center text-xl py-6 hover:bg-neutral-200">
            Create New Admin
          </button>
          <button onClick={handleClick} id="user-details" className="block w-full text-center text-xl py-6 hover:bg-neutral-200">
            User Details
          </button>
          <button onClick={handleClick} id="delete users" className="block w-full text-center text-xl py-6 hover:bg-neutral-200">
            Delete Users
          </button>
        </div>
        <div className="bg-neutral-100 col-span-3">
          {panelPage === "all-data" ? <AllData />:
          panelPage==='create'? <CreateNewAdmin/>:''}
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
}

export default AdminPanel;
