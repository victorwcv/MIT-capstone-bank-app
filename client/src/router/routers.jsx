import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../errorPage";
import OnlineBanking from "../pages/onlineBanking_Page/onlineBanking";
import CreateAccount from "../pages/createAccount_Page/createAccount";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/online-banking",
    element: <OnlineBanking />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />
  }
]);

export default Router;
