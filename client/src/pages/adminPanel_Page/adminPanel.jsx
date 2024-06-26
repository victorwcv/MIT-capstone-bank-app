import { useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import Layout from "../../layouts/Layout";
import icons from "../../data/icons_Data";

const transactionsOptions = [
  { path: "/admin-panel", label: "Admin Panel" },
  { path: "/admin-panel/create-new-admin", label: "Create Admin" },
  { path: "/admin-panel/search-user", label: "Search User" },
  { path: "/admin-panel/all-data", label: "All Data" },
  { path: "/admin-panel/admin-log", label: "Admin Log" },
];

function AdminPanel() {
  const { administering } = useSelector((state) => state.admin);
  const location = useLocation();

  console.log("rendering transactions!");

  return (
    <Layout>
      <div
        className={`flex items-center justify-center relative w-full min-h-[80vh] my-12 bg-neutral-100 shadow-lg`}
      >
        <div className="absolute h-full left-0 flex flex-col p-3 justify-center gap-1 bg-[var(--secondary-color)]">
          {transactionsOptions.map((option, index) => {
            return (
              <Link to={administering ? option.path : ""} key={index}>
                <div
                  className={`flex pl-6  items-center border-2 border-transparent hover:border-neutral-700 rounded-md bg-[var(--secondary-color)] text-white text-xl w-60 h-16  ${
                    location.pathname === option.path
                      ? "translate-x-10 bg-slate-500 border-neutral-800 shadow-xl"
                      : " hover:translate-x-5 hover:bg-slate-600 "
                  } transition-all`}
                >
                  <p className="text-center mr-2">{option.label}</p>
                  {option.label !== "Admin Panel" &&
                    !administering &&
                    icons.lock}{" "}
                </div>
              </Link>
            );
          })}
        </div>
        <div className="ml-60 w-full px-36">
          <Outlet />
        </div>
      </div>
    </Layout>
  );
}

export default AdminPanel;
