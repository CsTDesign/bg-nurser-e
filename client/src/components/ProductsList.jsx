import { Star, Trash2 } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { motion } from "framer-motion";

const ProductsList = () => {
  const {
    deleteProduct,
    toggleFeaturedProduct,
    products
  } = useProductStore();

  console.log("products", products);
  
  return (
    <motion.div
      animate={{
        opacity: 1,
        y: 0
      }}
      className="bg-white max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg"
      initial={{
        opacity: 0,
        y: 20
      }}
      transition={{ duration: 0.8 }}
    >
      <table className="divide-gray-700 divide-y min-w-full">
        <thead className="bg-emerald-600">
          <tr>
            <th
              className="font-medium px-6 py-3 text-left text-white text-xs tracking-wider uppercase"
              scope="col"
            >
              Product
            </th>
            <th
              className="font-medium px-6 py-3 text-left text-white text-xs tracking-wider uppercase"
              scope="col"
            >
              Price
            </th>
            <th
              className="font-medium px-6 py-3 text-left text-white text-xs tracking-wider uppercase"
              scope="col"
            >
              Stock Quantity
            </th>
            <th
              className="font-medium px-6 py-3 text-left text-white text-xs tracking-wider uppercase"
              scope="col"
            >
              Category
            </th>
            <th
              className="font-medium px-6 py-3 text-left text-white text-xs tracking-wider uppercase"
              scope="col"
            >
              Featured
            </th>
            <th
              className="font-medium px-6 py-3 text-left text-white text-xs tracking-wider uppercase"
              scope="col"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-gray-700 divide-y">
          {
            products?.map((product) => (
              <tr
                className="hover:bg-emerald-50"
                key={product._id}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        alt={product.name}
                        className="h-10 object-cover rounded-full w-10"
                        src={product.image}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-sm">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    ${product.price.toFixed(2)}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    {product.stockQty}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    {product.category}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className={
                      `duration-200 hover:bg-amber-500 p-1 ${
                        product.isFeatured
                          ? "bg-amber-400 text-amber-600"
                          : "bg-gray-300 text-gray-500"
                      } rounded-full transition-colors`
                    }
                    onClick={() => toggleFeaturedProduct(product._id)}
                  >
                    <Star className="h-5 w-5" />
                  </button>
                </td>

                <td className="font-medium px-6 py-4 text-sm whitespace-nowrap">
                  <button
                    className="hover:text-red-300 text-red-400"
                    onClick={() => deleteProduct(product._id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </motion.div>
  );
};

export default ProductsList;
