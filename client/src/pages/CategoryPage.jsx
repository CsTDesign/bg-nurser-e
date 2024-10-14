import { useParams } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import { useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const {
    fetchProductsByCategory,
    products
  } = useProductStore();

  const { category } = useParams();

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [
    fetchProductsByCategory,
    category
  ]);

  console.log("products", products);
  
  return (
    <div className="min-h-screen">
      <div className="lg:px-8 max-w-screen-xl mx-auto px-4 py-16 relative sm:px-6 z-10">
        <motion.h1
          animate={{
            opacity: 1,
            y: 0
          }}
          className="font-bold mb-8 sm:text-5xl text-4xl text-center text-emerald-400"
          initial={{
            opacity: 0,
            y: -20
          }}
          transition={{ duration: 0.8 }}
        >
          {
            category.charAt(0).toUpperCase() + category.slice(1)
          }
        </motion.h1>

        <motion.div
          animate={{
            opacity: 1,
            y: 0
          }}
          className="gap-6 grid grid-cols-1 justify-items-center lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4"
          initial={{
            opacity: 0,
            y: 20
          }}
          transition={{
            delay: 0.2,
            duration: 0.8
          }}
        >
          {
            products?.length === 0 && (
              <h2 className="col-span-full font-semibold text-3xl text-center text-gray-400">
                No products found
              </h2>
            )
          }

          {
            products?.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))
          }
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPage;
