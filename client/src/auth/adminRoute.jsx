import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminRoute() {
  const { currentUser } = useSelector((state) => state.user);

  let isAdmin = currentUser && currentUser.role === "admin";

  return isAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoute;
