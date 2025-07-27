import { useQuery } from "react-query";
import axios from "axios";
import Product from "../../Components/Product/Product";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";

export default function Home() {
  const getProducts = () =>
    axios.get("https://fakestoreapi.com/products").then((res) => res.data);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery("products", getProducts, {
    refetchInterval: 60000,
  });

  if (isLoading) return <LoadingScreen />;
  if (isError) {
    toast.error("Something went wrong while fetching cart.", {
      autoClose: 2000,
      theme: localStorage.getItem("theme") === "light" ? "light" : "dark",
    });
  }

  return (
    <>
      <ScrollToTop />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 dark:bg-black">
        {products?.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    </>
  );
}
