import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "./router/routers.jsx";
import { Provider } from "react-redux";
import "./index.css";
import { persistor, store } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <RouterProvider router={Router} />
    </PersistGate>
  </Provider>
);
