import React, { createContext, useContext, useState } from "react";
import Sidenav from "./components/sidebar";
import styles from "./App.module.scss";
import Navbar from "./components/navbar";
import classNames from "classnames";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Client from "./containers/clients";
import Transactions from "./containers/transactions";
import ClientDetails from "./containers/clients/clientDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetails from "./containers/transactions/productDetails";
import Dashboard from "./containers/dashboard";
import Sale from "./containers/invoice/sales";
import Login from "./containers/auth/login";
import Register from "./containers/auth/register";
import UserProfile from "./containers/profile";
import Purchase from "./containers/invoice/purchase";

export const ThemeContext = createContext();

const AppLayout = () => {
  const themeContext = useContext(ThemeContext);
  const isAuthenticated = localStorage.getItem("token");

  const { theme, toggleTheme } = themeContext;

  return (
    <div className={classNames(styles.app, `${theme}`)}>
      {!isAuthenticated ? (
        <Login />
      ) : (
        <>
          <div className={styles.sidebar}>
            <Sidenav />
          </div>
          <div className={styles.layout}>
            {" "}
            <div className={styles.navbar}>
              <Navbar />
            </div>
            <div className={styles.mainContent}>
              <Outlet />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token");
  // const isAuthenticated = true;
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <ProtectedRoute element={<Dashboard />} />,
        },
        {
          path: "/clients",
          element: <ProtectedRoute element={<Client />} />,
        },
        {
          path: "/product",
          element: <ProtectedRoute element={<Transactions />} />,
        },
        {
          path: "/clientDetails/:id",
          element: <ProtectedRoute element={<ClientDetails />} />,
        },
        {
          path: "/product/:id",
          element: <ProtectedRoute element={<ProductDetails />} />,
        },
        {
          path: "/dashboard",
          element: <ProtectedRoute element={<Dashboard />} />,
        },
        {
          path: "/sales",
          element: <ProtectedRoute element={<Sale />} />,
        },
        {
          path: "/purchase",
          element: <ProtectedRoute element={<Purchase />} />,
        },
        {
          path: "/profile",
          element: <ProtectedRoute element={<UserProfile />} />,
        },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);

  return (
    <div className="App">
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <RouterProvider router={appRouter} />
      </ThemeContext.Provider>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </div>
  );
}

export default App;
//