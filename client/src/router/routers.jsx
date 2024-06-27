import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import ErrorPage from "../components/ErrorPage.jsx";
import OnlineBanking from "../pages/online_banking_page/OnlineBanking.jsx";
import Dashboard from "../pages/dashBoard_Page/Dashboard.jsx";
import PrivateRoute from "../auth/PrivateRoute.jsx";
import AdminRoute from "../auth/AdminRoute.jsx";
import AdminPanel from "../pages/adminPanel_Page/AdminPanel.jsx";
import AllData from "../components/adminPanel/AllData.jsx";
import Transactions from "../pages/transactions_Page/Transactions.jsx";
import Withdrawal from "../components/transactions/Withdrawal.jsx";
import Deposit from "../components/transactions/Deposit.jsx";
import Home from "../pages/home_Page/Home.jsx";
import NewBankAccount from "../components/transactions/NewBankAccount.jsx";
import BankTransfer from "../components/transactions/BankTransfer.jsx";
import PayBills from "../components/transactions/PayBills.jsx";
import CloseAccount from "../components/transactions/CloseAccount.jsx";
import CreateNewAdmin from "../components/adminPanel/CreateNewAdmin.jsx";
import AdminData from "../components/adminPanel/AdminData.jsx";
import OperateAdminRoute from "../auth/OperateAdminRoute.jsx";
import SearchUser from "../components/adminPanel/SearchUser.jsx";
import AdminLog from "../components/adminPanel/AdminLog.jsx";
import PublicRoute from "../auth/PublicRoute.jsx";
import CreateAccount from "../pages/create_account_Page/CreateAccount.jsx";

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
