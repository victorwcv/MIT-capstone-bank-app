import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from "primereact/api";
import { Toaster } from "react-hot-toast";
import { queryClient } from "@/lib/react-query";
import App from "./App";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { ThemeProvider } from "./components/ThemeProvider";
//import "./index.css";

const value = {
  ripple: true,
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider value={value}>
        <ThemeProvider>
          <App />
          <Toaster position="top-right" />
        </ThemeProvider>
      </PrimeReactProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
