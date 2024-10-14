import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";

const CartPage = () => {
  const { cart } = useCartStore();
  
  return (
    <div className="md:py-16 py-8">
      <div className="lg:flex lg:items-start md:gap-6 mt-6 sm:mt-8 xl:gap-8">
        <motion.div
          animate={{
            opacity: 1,
            x: 0
          }}
          className="flex-none lg:max-w-2xl mx-auto w-full xl:max-w-4xl"
          initial={{
            opacity: 0,
            x: -20
          }}
          transition={{
            delay: 0.2,
            duration: 0.5
          }}
        >
          {
            cart.length === 0 ? (
              <EmptyCartUI />
            ) : (
              <div className="space-y-6">
                {
                  cart.map((item) => (
                    <CartItem
                      item={item}
                      key={item._id}
                    />
                  ))
                }
              </div>
            )
          }

          {
            cart.length > 0 && <PeopleAlsoBought />
          }
        </motion.div>

        {
          cart.length > 0 && (
            <motion.div
              animate={{
                opacity: 1,
                x: 0
              }}
              className="flex-1 lg:mt-0 lg:w-full max-w-4xl mt-6 mx-auto space-y-6"
              initial={{
                opacity: 0,
                x: 20
              }}
              transition={{
                delay: 0.4,
                duration: 0.5
              }}
            >
              <OrderSummary />
              <GiftCouponCard />
            </motion.div>
          )
        }
      </div>
    </div>
  );
};

export default CartPage;

const EmptyCartUI = () => (
  <motion.div
    animate={{
      opacity: 1,
      y: 0
    }}
    className="flex flex-col items-center justify-center py-16 space-y-4"
    initial={{
      opacity: 0,
      y: 20
    }}
    transition={{ duration: 0.5 }}
  >
    <ShoppingCart className="h-24 w-24" />
    <h3 className="font-semibold text-2xl">
      Your cart is empty
    </h3>
    <p>
      You have not added any items to your cart yet.
    </p>
    <Link
      className="bg-emerald-500 hover:bg-emerald-600 mt-4 px-6 py-2 rounded-md text-white transition-colors"
      to="/"
    >
      Start Shopping
    </Link>
  </motion.div>
);
