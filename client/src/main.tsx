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
//import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <App />
        <Toaster position="top-right" />
      </PrimeReactProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
