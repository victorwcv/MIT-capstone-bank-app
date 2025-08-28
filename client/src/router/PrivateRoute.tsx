import { Navigate } from "react-router";
import { useAuthStore } from "@/stores";

interface PrivateRouteProps {
  children: React.JSX.Element;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const user = useAuthStore((state) => state.user);
  // const user = null; // Placeholder for user authentication logic

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};