import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function StarAdminRoute() {
  const { administering } = useSelector((state) => state.admin);
  return  administering ?  <Outlet /> : <Navigate to={"/admin-panel"} />;
}

export default StarAdminRoute;
