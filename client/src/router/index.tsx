/* import { BrowserRouter, Routes, Route } from "react-router";
import { MainLayout, AuthLayout } from "@/layouts";
import {
  DashboardPage,
  LoginPage,
  RegisterPage,
  TransactionsPage,
  NotFoundPage,
  DepositPage,
  WithdrawPage,
  ComingSoonPage,
} from "@/pages";
import { PrivateRoute } from "./PrivateRoute"; */

/* export const AppRouter = () => {
  return (
    <BrowserRouter basename="/MIT-capstone-bank-app/">
      <Routes>
       
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

     

        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="deposit" element={<DepositPage />} />
            <Route path="withdraw" element={<WithdrawPage />} />
            <Route path="transfer" element={<ComingSoonPage />} />
            <Route path="new-card" element={<ComingSoonPage />} />
            <Route path="new-money-account" element={<ComingSoonPage />} />
            <Route path="settings" element={<ComingSoonPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}; */

import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Component as Overview } from "@/pages/Overview";
import { Component as Send } from "@/pages/Send";
import { Component as Activity } from "@/pages/Activity";
import { Component as Settings } from "@/pages/Settings";
import { NotFound } from "@/pages/NotFound";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { index: true, element: <Overview /> },
        { path: "send", element: <Send /> },
        { path: "activity", element: <Activity /> },
        { path: "settings", element: <Settings /> },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
  {
    basename: "/MIT-capstone-bank-app/",
  }
);
