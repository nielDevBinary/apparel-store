import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Home } from "../pages/Home";
import { CategoryPage } from "../pages/CategoryPage";
import { ProductDetail } from "../pages/ProductDetail";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/category/:category",
        element: <CategoryPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
    ],
  },
]);


export function AppRouter() {
    return <RouterProvider router={router} />
}