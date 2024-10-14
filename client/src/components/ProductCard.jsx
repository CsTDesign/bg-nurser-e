import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  
  const isSoldOut = product.stockQty <= 0;

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", {
        id: "login"
      });
      return;
    } else {
      addToCart(product);
    }
  };
  
  return (
    <div className="bg-white border border-gray-700 flex flex-col overflow-hidden relative rounded-lg shadow-lg w-full">
      <div className="flex h-60 mt-3 mx-3 overflow-hidden relative rounded-xl">
        <img
          alt="product image"
          className="object-cover w-full"
          src={product.image}
        />
        
        <div className="absolute bg-black bg-opacity-20 inset-0" />
      </div>

      <div className="mt-4 pb-5 px-5">
        <h5 className="font-semibold text-xl tracking-tight">
          {product.name}
        </h5>

        <div className="flex items-center justify-between mb-5 mt-2">
          <p>
            <span className="font-bold text-3xl text-emerald-400">
              ${product.price}
            </span>
          </p>
        </div>

        {
          isSoldOut ? (
            <button
              className="bg-emerald-600 disabled:opacity-50 flex focus:outline-none focus:ring-4 focus:ring-emerald-300 font-medium hover:bg-emerald-700 items-center justify-center px-5 py-2.5 rounded-lg text-center text-sm text-white"
              disabled={true}
            >
              Sold out
            </button>
          ) : (
            <button
              className="bg-emerald-600 flex focus:outline-none focus:ring-4 focus:ring-emerald-300 font-medium hover:bg-emerald-700 items-center justify-center px-5 py-2.5 rounded-lg text-center text-sm text-white"
              onClick={handleAddToCart}
            >
              <ShoppingCart
                className="mr-2"
                size={22}
              />
              Add to Cart
            </button>
          )
        }

        <p>
          {
            isSoldOut ? (
              <span className="font-bold text-red-800 text-right text-sm">
                Please check back later.
              </span>
            ) : (
              <span className="font-bold text-right text-sm">
                {product.stockQty} available
              </span>
            )
          }
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
