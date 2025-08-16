import { BrowserRouter, Routes, Route } from "react-router";
import { MainLayout, AuthLayout } from "@/layouts";
import { DashboardPage, LoginPage, RegisterPage, TransactionsPage, NotFoundPage, TransactionPage } from "@/pages";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas (auth) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Rutas privadas */}
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="transactions"
            element={
              <PrivateRoute>
                <TransactionsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="transaction/new"
            element={
              <PrivateRoute>
                <TransactionPage />
              </PrivateRoute>
            }
          />
        </Route>
        {/* Ruta para 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
