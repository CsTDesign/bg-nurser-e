import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Q8ax0IhTRJ1ds81eZSJyd8Zuf38MiRpjRo5QVG4c1UH2hgykIn6egqwY3LWfSv2T9vP5D6nFZiyApzzQbfQSM3w00BrhtnDnY"
);

const OrderSummary = () => {
  const {
    total,
    subtotal,
    coupon,
    isCouponApplied,
    cart
  } = useCartStore();

	const savings = subtotal - total;
	const formattedSubtotal = subtotal.toFixed(2);
	const formattedTotal = total.toFixed(2);
	const formattedSavings = savings.toFixed(2);

	const handlePayment = async () => {
		try {
      const stripe = await stripePromise;

      const res = await axios.post("/payments/create-checkout-session", {
        products: cart,
        couponCode: coupon ? coupon.code : null,
      });
      
      const session = res.data;

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      
      if (result.error) {
        console.error("Error during Stripe checkout:", result.error);
      }
    } catch (error) {
      console.error("Error in handlePayment", error);
    }
	};
  
  return (
    <motion.div
      animate={{
        opacity: 1,
        y: 0
      }}
      className="bg-white border border-gray-700 p-4 rounded-lg shadow-sm sm:p-6 space-y-4"
      initial={{
        opacity: 0,
        y: 20
      }}
      transition={{ duration: 0.5 }}
    >
      <p className="font-semibold text-emerald-400 text-xl">
        Order Summary
      </p>

      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex gap-4 items-center justify-between">
            <dt className="font-normal text-base">
              Original Price
            </dt>

            <dd className="font-normal text-base">
              ${formattedSubtotal}
            </dd>
          </dl>

          {
            savings > 0 && (
              <dl className="flex gap-4 items-center justify-between">
                <dt className="font-normal text-base">
                  Savings
                </dt>

                <dd className="font-normal text-base text-emerald-400">
                  -${formattedSavings}
                </dd>
              </dl>
            )
          }

          {
            coupon && isCouponApplied && (
              <dl className="flex gap-4 items-center justify-between">
                <dt className="font-normal text-base">
                  Coupon (
                    {coupon.code}
                  )
                </dt>

                <dd className="font-normal text-base text-emerald-400">
                  -{coupon.discountPercentage}%
                </dd>
              </dl>
            )
          }

          <dl className="border-gray-600 border-t flex gap-4 items-center justify-between pt-2">
            <dt className="font-normal text-base">
              Total
            </dt>

            <dd className="font-normal text-base text-emerald-400">
              ${formattedTotal}
            </dd>
          </dl>
        </div>

        <motion.button
          className="bg-emerald-600 flex focus:outline-none focus:ring-4 focus:ring-emerald-300 font-medium hover:bg-emerald-700 items-center justify-center px-5 py-2.5 rounded-lg text-sm text-white w-full"
          onClick={handlePayment}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Proceed to Checkout
        </motion.button>

        <div className="flex gap-2 items-center justify-center">
          <span className="font-normal text-sm">
            or
          </span>

          <Link
            className="font-medium gap-2 hover:no-underline hover:text-emerald-300 inline-flex items-center text-emerald-400 text-sm underline"
            to="/"
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
