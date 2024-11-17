import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./Context";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TrendingPage from "./pages/TrendingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element:  <ContextProvider><App /></ContextProvider>,
  },
  {
    path:"trending",
    element:<TrendingPage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


