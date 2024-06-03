import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../errorPage";
import OnlineBanking from "../pages/onlineBanking_Page/onlineBanking";
import CreateAccount from "../pages/createAccount_Page/createAccount";
import Layout from "../layouts/layout";
import PrivateRoute from "../components/privateRoute";
import Dashboard from "../pages/dashBoard_Page/dashboard";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "/dashboard",
        element: <PrivateRoute />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "/create-account",
        element: <CreateAccount />,
      },
      {
        path: "online-banking",
        element: <OnlineBanking />, //  Redirect to /onlineBanking_Page when not logged in.
      }
    ],
  },
]);

export default Router;
