import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function PublicRoute() {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser?.role === "admin" ? (
    <Navigate to="/admin-panel" />
  ) : currentUser?.role === "user" ? (
    <Navigate to="/transactions" />
  ) : (
    <Outlet />
  );
}

export default PublicRoute;
