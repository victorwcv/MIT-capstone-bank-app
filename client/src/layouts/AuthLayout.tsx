import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Outlet />
    </div>
  );
};