import { motion } from "framer-motion";
import {
  useEffect,
  useState
} from "react";
import { useCartStore } from "../stores/useCartStore";

const GiftCouponCard = () => {
  const [
    userInputCode,
    setUserInputCode
  ] = useState("");
  const {
    coupon,
    isCouponApplied,
    applyCoupon,
    getMyCoupon,
    removeCoupon
  } = useCartStore();

  useEffect(() => {
    getMyCoupon()
  }, [getMyCoupon]);

  useEffect(() => {
    if (coupon) setUserInputCode(coupon.code);
  }, [coupon]);

  const handleApplyCoupon = () => {
    if (!userInputCode) return;
    applyCoupon(userInputCode);
  };

  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setUserInputCode("");
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
      transition={{
        delay: 0.2,
        duration: 0.5
      }}
    >
      <div className="space-y-4">
        <div>
          <label
            className="block font-medium mb-2 text-sm"
            htmlFor="voucher"
          >
            Do you have any coupons?
          </label>
          <input
            className="block border border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 p-2.5 placeholder-gray-400 rounded-lg text-sm w-full"
            id="voucher"
            onChange={(e) => setUserInputCode(e.target.value)}
            placeholder="Enter promo code"
            required
            type="text"
            value={userInputCode}
          />
        </div>

        <motion.button
          className="bg-emerald-600 flex focus:outline-none focus:ring-4 focus:ring-emerald-300 font-medium hover:bg-emerald-700 items-center justify-center px-5 py-2.5 rounded-lg text-sm text-white w-full"
          onClick={handleApplyCoupon}
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Apply Coupon
        </motion.button>
      </div>

      {
        isCouponApplied && coupon && (
          <div className="mt-4">
            <h3 className="font-medium text-gray-300 text-lg">
              Coupon Applied
            </h3>

            <p className="mt-2 text-gray-400 text-sm">
              {coupon.code} - {coupon.discountPercentage}% off
            </p>

            <motion.button
              className="bg-red-600 flex focus-outline-none focus:ring-4 focus:ring-red-300 font-medium hover:bg-red-700 items-center justify-center mt-2 px-5 py-2.5 rounded-lg text-sm text-white w-full"
              onClick={handleRemoveCoupon}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Remove Coupon
            </motion.button>
          </div>
        )
      }

      {
        coupon && (
          <div className="mt-4">
            <h3 className="font-medium text-lg">
              Available Coupon:
            </h3>

            <p className="mt-2 text-sm">
              {coupon.code} - {coupon.discountPercentage}% off
            </p>
          </div>
        )
      }
    </motion.div>
  );
};

export default GiftCouponCard;
