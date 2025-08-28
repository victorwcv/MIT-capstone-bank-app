import { Header, Sidebar } from "@/components";
import { Outlet } from "react-router";

export const MainLayout = () => {

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header/>
        <div className="flex-1 max-h-[calc(100vh-64px)] overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
