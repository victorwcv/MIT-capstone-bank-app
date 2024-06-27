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
import Withdrawal from "../components/transactions/Withdrawal";
import Deposit from "../components/transactions/Deposit";
import Home from "../pages/home_Page/Home";
import NewBankAccount from "../components/transactions/NewBankAccount";
import BankTransfer from "../components/transactions/BankTransfer";
import PayBills from "../components/transactions/PayBills";
import CloseAccount from "../components/transactions/CloseAccount";
import CreateNewAdmin from "../components/adminPanel/CreateNewAdmin";
import AdminData from "../components/adminPanel/AdminData";
import OperateAdminRoute from "../auth/OperateAdminRoute";
import SearchUser from "../components/adminPanel/SearchUser";
import AdminLog from "../components/adminPanel/AdminLog";
import PublicRoute from "../auth/PublicRoute";

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
        // Public Routes
        path: "",
        element: <PublicRoute />,
        children: [
          {
            path: "/create-account",
            element: <CreateAccount />,
          },
          {
            path: "/online-banking",
            element: <OnlineBanking />,
          },
        ],
      },

      // Admin Routes
      {
        path: "/admin-panel",
        element: <AdminRoute />,
        children: [
          {
            path: "",
            element: <AdminPanel />,
            children: [
              {
                path: "",
                element: <AdminData />,
              },
              {
                path: "",
                element: <OperateAdminRoute />,
                children: [
                  {
                    path: "all-data",
                    element: <AllData />,
                  },
                  {
                    path: "create-new-admin",
                    element: <CreateNewAdmin />,
                  },
                  {
                    path: "search-user",
                    element: <SearchUser />,
                  },
                  {
                    path: "admin-log",
                    element: <AdminLog />,
                  },
                ],
              },
            ],
          },
        ],
      },

      // Dashboard Routes
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

      // Transaction Routes
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
                path: "/transactions/new-bank-account",
                element: <NewBankAccount />,
              },
              {
                path: "/transactions/bank-transfer",
                element: <BankTransfer />,
              },
              {
                path: "/transactions/pay-bills",
                element: <PayBills />,
              },
              {
                path: "/transactions/delete-bank-account",
                element: <CloseAccount />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default Router;
