import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import ErrorPage from "../components/ErrorPage.jsx";
// pages
import Home from "../pages/home.page/Home.jsx";
import OnlineBanking from "../pages/online_banking.page/OnlineBanking.jsx";
import CreateAccount from "../pages/create_account.page/CreateAccount.jsx";
import Dashboard from "../pages/dashboard.page/Dashboard.jsx";
import AdminPanel from "../pages/admin_panel.page/AdminPanel.jsx";
import Transactions from "../pages/transactions.page/Transactions.jsx";
// auth
import PrivateRoute from "../auth/private_route.jsx";
import AdminRoute from "../auth/admin_route.jsx";
import OperateAdminRoute from "../auth/operation_route.jsx";
import PublicRoute from "../auth/public_route.jsx";
// components
import AllData from "../components/admin_panel.components/AllData.jsx";
import Withdrawal from "../components/transactions.components/Withdrawal.jsx";
import Deposit from "../components/transactions.components/Deposit.jsx";
import NewBankAccount from "../components/transactions.components/NewBankAccount.jsx";
import BankTransfer from "../components/transactions.components/BankTransfer.jsx";
import PayBills from "../components/transactions.components/PayBills.jsx";
import CloseAccount from "../components/transactions.components/CloseAccount.jsx";
import CreateNewAdmin from "../components/admin_panel.components/CreateNewAdmin.jsx";
import AdminData from "../components/admin_panel.components/AdminData.jsx";
import SearchUser from "../components/admin_panel.components/SearchUser.jsx";
import AdminLog from "../components/admin_panel.components/AdminLog.jsx";
import DeleteUser from "../components/admin_panel.components/DeleteUser.jsx";

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
            element: <CreateAccount />
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
                  {
                    path: "delete-user",
                    element: <DeleteUser />
                  }
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
