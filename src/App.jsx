import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import NotFound from "./Pages/NotFound/NotFound";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "productDetails/:id",
        element: <ProductDetails />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

let queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} /> <ToastContainer />
      </QueryClientProvider>
    </>
  );
}

export default App;
