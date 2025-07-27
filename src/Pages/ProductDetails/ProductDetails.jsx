import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";

export default function ProductDetails() {
  const { id } = useParams();

  const getProduct = () =>
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.data);

  const {
    data: product,
    isLoading: isLoadingProduct,
    refetch: refetchProduct,
  } = useQuery(["product", id], getProduct, { refetchInterval: 60000 });

  useEffect(() => {
    refetchProduct();
  }, [id]);

  if (isLoadingProduct) return <LoadingScreen />;

  return (
    <>
      <ScrollToTop />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4 mb-8">
          <img
            src={product?.image}
            alt="Product"
            className="w-full rounded-lg shadow-md dark:shadow-darkCard"
          />
        </div>

        <div className="col-span-12 md:col-start-6 md:col-span-7">
          <h2 className="text-3xl font-bold mb-2">{product?.title}</h2>
          <p className="text-gray-600 mb-4 dark:text-white">
            {product?.description}
          </p>

          <div className="mb-4">
            <span className="text-2xl font-bold mr-2">
              {product?.price} EGP
            </span>
          </div>

          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-6 h-4 ${
                  index < Math.round(product?.rating?.rate)
                    ? "text-yellow-300"
                    : "text-gray-300"
                } me-1`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M10.984 1.566l2.412 4.888 5.4.79c.732.108 1.022 1.008.494 1.523l-3.906 3.803.922 5.38c.125.733-.64 1.292-1.296.947L11 16.022l-4.81 2.525c-.656.345-1.42-.214-1.296-.947l.922-5.38L1.91 8.767c-.527-.515-.238-1.415.494-1.523l5.4-.79 2.412-4.888c.33-.668 1.284-.668 1.614 0z" />
              </svg>
            ))}
            <p className="ms-2 text-sm text-gray-500">
              {product?.rating?.rate} out of 5
            </p>
          </div>

          <p className="text-main text-2xl my-4">{product?.category}</p>
        </div>
      </div>
    </>
  );
}
