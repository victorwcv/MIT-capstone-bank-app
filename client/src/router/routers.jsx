import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../errorPage";
import OnlineBanking from "../pages/onlineBanking_Page/onlineBanking";
import CreateAccount from "../pages/createAccount_Page/createAccount";
import Layout from "../layouts/layout";
import Dashboard from "../pages/dashBoard_Page/dashboard";
import PrivateRoute from "../auth/privateRoute";
import AdminRoute from "../auth/adminRoute";
import AdminPanel from "../pages/adminPanel_Page/adminPanel";
import Transactions from "../pages/transactions_Page/transactions";
import AllData from "../components/allData_Comp/allData";
import Deposit from "../components/deposit_Comp/deposit";
import Withdrawal from "../components/withdraw_Comp/withdrawal";
import HistoryTransactions from "../components/historyTransactions_Comp/historyTransactions";

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
        element: <PrivateRoute/>,
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
        element: <AdminRoute/>,
        children: [
          {
            path: "",
            element: <AdminPanel />,
          },
        ],
      },
      {
        path: '/transactions',
        element: <PrivateRoute />,
        children: [
          {
            path: '',
            element: <Transactions />,
            children:[
              {
                path:'',
                element: <div>Please Choose a transaction</div>,
              },
              {
                path: "/transactions/deposit",
                element: <Deposit />
              },
              {
                path: "/transactions/withdrawal",
                element: <Withdrawal />
              },
              {
                path: "/transactions/history",
                element: <HistoryTransactions />
              },
            ]
          }
        ]
      }
    ],
  },
]);

export default Router;
