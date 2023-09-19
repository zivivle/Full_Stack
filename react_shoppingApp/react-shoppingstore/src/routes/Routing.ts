import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import Main from "../pages/main";
import CartPage from "../pages/cart";
import LoginPage from "../pages/login";
import SignUpPage from "../pages/signup";
import ProductDetail from "../pages/product-detail";
import ProtectedRoute from "./ProtectedRoute";
import { ReactNode } from "react";

interface RouteConfig {
  path?: string;
  element?: ReactNode;
  children?: RouteConfig[]; // 자식 라우트 설정을 재귀적으로 참조
}

const router: RouteConfig[] = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/product",
        element: (
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        ),
      },
      {
        path: "/productDetail",
        element: (
          <ProtectedRoute>
            <ProductDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
