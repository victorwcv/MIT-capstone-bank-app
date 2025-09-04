import { MobileFooter, MobileHeader, Sidebar } from "@/components";
import { Outlet } from "react-router";

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-auto ">
        <MobileHeader />
        <div className="p-0 sm:p-4 pb-16 sm:pb-0 ">
          <Outlet />
        </div>
        <MobileFooter />
      </div>
    </div>
  );
};
