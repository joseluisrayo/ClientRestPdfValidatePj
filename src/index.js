import React from "react";
import App from "./App";
import Page404 from "./pages/Page404";
import "./css/index.css";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page404 />,
  },
  {
    path: "supremaverificadorpdf/:namepdf",
    element: <App />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
