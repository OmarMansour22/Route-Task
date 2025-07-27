import { Link } from "react-router-dom";
export default function Product({ product }) {
  return (
    <>
      <div className="w-full p-3 shadow-card dark:shadow-darkCard relative overflow-hidden group rounded-lg">
        <Link
          to={"/productDetails/" + product?.id}
        >
          <img
            className="w-full h-100 object-contain mb-2"
            src={product?.image}
            alt=""
          />
          <h2 className="text-main text-xl  font-bold">{product?.category}</h2>
          <h3 className="font-semibold my-1">
            {product?.title?.split(" ").slice(0, 2).join(" ")}
          </h3>
          <div className="productDetail flex justify-between my-1">
            <p className="font-medium my-1">{product?.price} EGP</p>
            <p className="font-medium my-1">
              <i className="fa-solid fa-star text-yellow-300"></i>
              {product?.rating?.rate}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
