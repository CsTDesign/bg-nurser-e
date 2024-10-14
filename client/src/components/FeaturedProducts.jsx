import {
  useEffect,
  useState
} from "react";
import { useCartStore } from "../stores/useCartStore";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart
} from "lucide-react";

const FeaturedProducts = ({ featuredProducts }) => {
  const [
    currentIndex,
    setCurrentIndex
  ] = useState(0);
  const [
    itemsPerPage,
    setItemsPerPage
  ] = useState(4);
  const { addToCart } = useCartStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
  };
  const prevSlide = () => {
    setCurrentIndex((nextIndex) => nextIndex - itemsPerPage);
  };

  const isStartDisabled = currentIndex === 0;
  const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;
  
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="font-bold mb-4 sm:text-6xl text-5xl text-center text-emerald-400">
          Featured Products
        </h2>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="duration-300 ease-in-out flex transition-transform"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerPage)
                }%)`
              }}
            >
              {
                featuredProducts?.map((product) => (
                  <div
                    className="flex-shrink lg:w-1/3 px-2 sm:w-1/2 w-full xl:w-1/4"
                    key={product._id}
                  >
                    <div className="backdrop-blur-sm bg-white border border-emerald-500/30 duration-300 h-full hover:shadow-xl overflow-hidden rounded-lg shadow-lg transition-all">
                      <div className="overflow-hidden">
                        <img
                          alt={product.name}
                          className="duration-300 ease-in-out h-48 hover:scale-110 object-cover transition-transform w-full"
                          src={product.image}
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="font-semibold mb-2 text-lg">
                          {product.name}
                        </h3>

                        <p className="font-medium mb-4 text-emerald-300">
                          ${product.price.toFixed(2)}
                        </p>

                        <button
                          className="bg-emerald-600 duration-300 flex font-semibold hover:bg-emerald-500 items-center justify-center px-4 py-2 rounded text-white transition-colors w-full"
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingCart className="h-5 mr-2 w-5" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          <button
            className={
              `absolute duration-300 ${
                isStartDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500"
              } -left-4 p-2 rounded-full top-1/2 transform transition-colors -translate-y-1/2`
            }
            disabled={isStartDisabled}
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            className={
              `absolute duration-300 ${
                isEndDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500"
              } p-2 -right-4 rounded-full top-1/2 transform transition-colors -translate-y-1/2`
            }
            disabled={isEndDisabled}
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
