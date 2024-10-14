import { ArrowLeft, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PurchaseCancelPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <motion.div
        animate={{
          opacity: 1,
          y: 0
        }}
        className="bg-white max-w-md overflow-hidden relative rounded-lg shadow-xl w-full z-10"
        initial={{
          opacity: 0,
          y: 20
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <XCircle className="h-16 mb-4 text-red-500 w-16" />
          </div>

          <h1 className="font-bold mb-2 sm:text-3xl text-2xl text-center text-red-500">
            Purchase Cancelled
          </h1>

          <p className="mb-6 text-center">
            Your order has been cancelled. No charges were applied to your card.
          </p>

          <div className="bg-gray-200 mb-6 p-4 rounded-lg">
            <p className="text-center text-sm">
              If you experienced any issues during checkout, please don&apos;t hesitate to contact our support team.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              className="bg-gray-200 duration-300 flex font-bold hover:bg-gray-300 items-center justify-center px-4 py-2 rounded-lg transition w-full"
              to={"/"}
            >
              <ArrowLeft
                className="mr-2"
                size={18}
              />
              Return to Shop
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PurchaseCancelPage;
