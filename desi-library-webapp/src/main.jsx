import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.jsx";
import Home from "./routes/Home.jsx";
import Books from "./routes/Books.jsx";
import Borrow from "./routes/Borrow.jsx";

import "./index.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { 
        index: true,
        element: <Home /> 
      },
      { // Redundant, but here in case it's "well known"
        path: "/home",
        element: <Home />
      },
      {
        path: "/books",
        element: <Books />
      },
      {
        path: "/borrow/:bookId",
        element: <Borrow />
      }
    ]
  }
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
