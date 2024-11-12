import { motion } from "framer-motion";
import { ImageUp, Loader2, PackagePlus } from "lucide-react";
import { useState } from "react";
import { useProductStore } from "../stores/useProductStore";

const categories = [
  "trees",
  "shrubs",
  "perennials",
  "annuals",
  "drygoods",
  "decorative",
  "irrigation",
  "maintenance"
];

const CreateProductForm = () => {
  const [
    newProduct,
    setNewProduct
  ] = useState({
    name: "",
    description: "",
    price: "",
    // stockQty: "",
    category: "",
    image: ""
  });

  const {
    createProduct,
    loading
  } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await createProduct(newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        // stockQty: "",
        category: "",
        image: ""
      });
    } catch {
      console.log("Error creating product");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewProduct({
          ...newProduct,
          image: reader.result
        });
      };

      reader.readAsDataURL(file); // base64
    }
  };
  
  return (
    <motion.div
      animate={{
        opacity: 1,
        y: 0
      }}
      className="bg-white max-w-xl mb-8 mx-auto p-8 rounded-lg shadow-lg"
      initial={{
        opacity: 0,
        y: 20
      }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="font-semibold mb-6 text-2xl text-emerald-300">
        Create New Product
      </h2>
      <form
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            className="block font-medium text-sm"
            htmlFor="name"
          >
            Product Name
          </label>
          <input
            className="bg-white block border border-gray-600 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 mt-1 px-3 py-2 rounded-md shadow-sm w-full"
            id="name"
            name="name"
            onChange={(e) => setNewProduct({
              ...newProduct,
              name: e.target.value
            })}
            required
            type="text"
            value={newProduct.name}
          />
        </div>

        <div>
          <label
            className="block font-medium text-sm"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="bg-white block border border-gray-600 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 mt-1 px-3 py-2 rounded-md shadow-sm w-full"
            id="description"
            name="description"
            onChange={(e) => setNewProduct({
              ...newProduct,
              description: e.target.value
            })}
            required
            rows="3"
            value={newProduct.description}
          />
        </div>

        <div>
          <label
            className="block font-medium text-sm"
            htmlFor="price"
          >
            Price
          </label>
          <input
            className="bg-white block border border-gray-600 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 mt-1 px-3 py-2 rounded-md shadow-sm w-full"
            id="price"
            name="price"
            onChange={(e) => setNewProduct({
              ...newProduct,
              price: e.target.value
            })}
            required
            step="0.01"
            type="number"
            value={newProduct.price}
          />
        </div>

        <div>
          <label
            className="block font-medium text-sm"
            htmlFor="category"
          >
            Category
          </label>
          <select
            className="bg-white block border border-gray-600 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 mt-1 px-3 py-2 rounded-md shadow-sm w-full"
            id="category"
            name="category"
            onChange={(e) => setNewProduct({
              ...newProduct,
              category: e.target.value
            })}
            required
            step="0.01"
            type="number"
            value={newProduct.category}
          >
            <option value="">
              Select category
            </option>
            {
              categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))
            }
          </select>
        </div>

        <div className="flex items-center mt-1">
          <input
            accept="image/*"
            className="sr-only"
            id="image"
            onChange={handleImageChange}
            type="file"
          />
          <label
            className="bg-white border border-gray-600 cursor-pointer focus:outline-none focue:ring-2 focus:ring-emerald-500 focus:ring-offset-2 font-medium hover:bg-gray-100 leading-4 px-3 py-2 rounded-md shadow-sm text-sm"
            htmlFor="image"
          >
            <ImageUp className="h-5 inline-block mr-2 w-5" />
            Upload Image
          </label>
          {
            newProduct.image && <span className="ml-3 text-sm">
              Image uploaded
            </span>
          }
        </div>

        <button
          className="bg-emerald-600 border border-transparent disabled:opacity-50 flex focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 font-medium hover:bg-emerald-700 justify-center px-4 py-2 rounded-md shadow-sm text-sm text-white w-full"
          type="submit"
        >
          {
            loading ? (
              <>
                <Loader2
                  aria-hidden="true"
                  className="h-5 mr-2 w-5"
                />
                Loading... Please wait
              </>
            ) : (
              <>
                <PackagePlus className="h-5 mr-2 w-5" />
                Create Product
              </>
            )
          }
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;
