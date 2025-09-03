import { BrowserRouter, Routes, Route } from "react-router";
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
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  return (
    <BrowserRouter basename="/MIT-capstone-bank-app/">
      <Routes>
        {/* Rutas públicas (auth) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Rutas privadas */}

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

        {/* Ruta para 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
