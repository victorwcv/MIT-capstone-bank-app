import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "./router/routers.jsx";
import { Provider } from "react-redux";
import "./index.css";
import { store } from "./store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store} >
    <RouterProvider router={Router} />
  </Provider>
);
