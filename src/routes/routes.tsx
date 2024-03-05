import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../layouts/ProtectedRoute";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import ManageProducts from "../pages/ManageProducts";
import SalesHistory from "../pages/SalesHistory";
import CreateVariant from "../pages/CreateVariant";
import AllSales from "../pages/AllSales";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute role={undefined}>
            <Navigate to={"manage-products"}></Navigate>
          </ProtectedRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <ProtectedRoute role="manager">
            <AddProduct></AddProduct>
          </ProtectedRoute>
        ),
      },
      {
        path: "create-variant/:productId",
        element: (
          <ProtectedRoute role="manager">
            <CreateVariant></CreateVariant>
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-product/:productId",
        element: (
          <ProtectedRoute role="manager">
            <EditProduct></EditProduct>
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <ProtectedRoute role={undefined}>
            <ManageProducts></ManageProducts>
          </ProtectedRoute>
        ),
      },
      {
        path: "all-sales",
        element: (
          <ProtectedRoute role={undefined}>
            <AllSales></AllSales>
          </ProtectedRoute>
        ),
      },
      {
        path: "sales-history",
        element: (
          <ProtectedRoute role={undefined}>
            <SalesHistory></SalesHistory>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);

export default router;
