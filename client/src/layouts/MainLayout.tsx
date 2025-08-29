import { Sidebar } from "@/components";
import { Outlet } from "react-router";

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};
