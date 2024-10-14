import {
  ChartColumn,
  Package,
  PackagePlus
} from "lucide-react";
import {
  useEffect,
  useState
} from "react";
import { motion } from "framer-motion";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import AnalyticsTab from "../components/AnalyticsTab";
import { useProductStore } from "../stores/useProductStore";

const tabs = [
  {
    id: "create",
    label: "Create Product",
    icon: PackagePlus
  },
  {
    id: "products",
    label: "Products",
    icon: Package
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: ChartColumn
  }
];

const AdminPage = () => {
  const [
    activeTab,
    setActiveTab
  ] = useState("create");

  const { fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);
  
  return (
    <div className="min-h-screen overflow-hidden relative">
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.h1
          animate={{
            opacity: 1,
            y: 0
          }}
          className="font-bold mb-8 text-4xl text-center text-emerald-400"
          initial={{
            opacity: 0,
            y: -20
          }}
          transition={{ duration: 0.8 }}
        >
          Admin Panel
        </motion.h1>

        <div className="flex justify-center mb-8">
          {
            tabs.map((tab) => (
              <button
                className={
                  `${
                    activeTab === tab.id
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  } duration-200 flex items-center mx-2 px-4 py-2 rounded-md transition-colors`
                }
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="h-5 mr-2 w-5" />
                {tab.label}
              </button>
            ))
          }
        </div>
        {activeTab === "create" && <CreateProductForm />}
        {activeTab === "products" && <ProductsList />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </div>
    </div>
  );
};

export default AdminPage;
