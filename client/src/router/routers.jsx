import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../components/ErrorPage";
import OnlineBanking from "../pages/onlineBanking_Page/OnlineBanking";
import CreateAccount from "../pages/createAccount_Page/CreateAccount";
import Dashboard from "../pages/dashBoard_Page/Dashboard";
import PrivateRoute from "../auth/PrivateRoute";
import AdminRoute from "../auth/AdminRoute";
import AdminPanel from "../pages/adminPanel_Page/AdminPanel";
import AllData from "../components/adminPanel/AllData";
import Transactions from "../pages/transactions_Page/Transactions";
import HistoryTransactions from "../components/transactions/HistoryTransactions";
import Withdrawal from "../components/transactions/Withdrawal";
import Deposit from "../components/transactions/Deposit";
import Home from "../pages/home_Page/Home";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
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
        path: "/online-banking",
        element: <OnlineBanking />, //  Redirect to /onlineBanking_Page when not logged in.
      },
      {
        path: "/admin-panel",
        element: <AdminRoute />,
        children: [
          {
            path: "",
            element: <AdminPanel />,
          },
        ],
      },
      {
        path: "/transactions",
        element: <PrivateRoute />,
        children: [
          {
            path: "",
            element: <Transactions />,
            children: [
              {
                path: "/transactions/deposit",
                element: <Deposit />,
              },
              {
                path: "/transactions/withdrawal",
                element: <Withdrawal />,
              },
              {
                path: "/transactions/history",
                element: <HistoryTransactions />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default Router;
