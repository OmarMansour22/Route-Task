import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Product from "../../Components/Product/Product";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";

export default function Products() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  const getProducts = () =>
    axios.get("https://fakestoreapi.com/products").then((res) => res.data);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery("products", getProducts, {
    refetchInterval: 60000,
  });

  useEffect(() => {
    if (!products) return;

    let filtered = products.filter((product) =>
      product?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOption === "priceLow") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHigh") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortOption === "nameAZ") {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredProducts(filtered);
  }, [searchQuery, products, sortOption]);

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
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        {/* Sort Dropdown on the left */}
        <select
          className="min-w-[170px] p-2 border rounded-lg border-gray-500 text-gray-800 dark:text-black"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="priceLow">Price (Low to High)</option>
          <option value="priceHigh">Price (High to Low)</option>
          <option value="nameAZ">Name (A–Z)</option>
        </select>

        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 min-w-[250px] p-3 border rounded-lg border-gray-500 outline-gray-700 text-gray-800 dark:text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product product={product} key={product.id} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No products found.
          </p>
        )}
      </div>
    </>
  );
}
