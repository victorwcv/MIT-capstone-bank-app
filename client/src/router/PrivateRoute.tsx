import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/stores";

export const PrivateRoute = () => {
  const user = useAuthStore((state) => state.user);
  // const user = null; // Placeholder for user authentication logic

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
