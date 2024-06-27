import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function OperateAdminRoute() {
  const { administering } = useSelector((state) => state.admin);
  return administering ? <Outlet /> : <Navigate to={"/admin-panel"} />;
}

export default OperateAdminRoute;
