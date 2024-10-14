import {
  ArrowRight,
  CheckCircle,
  HandHeart
} from "lucide-react";
import {
  useEffect,
  useState
} from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
  const [
    isProcessing,
    setIsProcessing
  ] = useState(true);

  const { clearCart } = useCartStore();

  const [
    error,
    setError
  ] = useState(null);

  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        await axios.post("payments/checkout-success", {
          sessionId
        });

        clearCart();
      } catch (error) {
        console.log(error);
      } finally {
        setIsProcessing(false);
      }
    }

    const sessionId = new URLSearchParams(window.location.search).get("session_id");

    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setIsProcessing(false);

      setError("No session ID found in the URL");
    }
  }, [clearCart]);

  if (isProcessing) return "Processing... Please wait";

  if (error) return `Error: ${error}`;
  
  return (
    <div className="flex h-screen items-center justify-center px-4">
      <Confetti
        gravity={0.1}
        height={window.innerHeight}
        numberOfPieces={700}
        recycle={false}
        style={{ zIndex: 99 }}
        width={window.innerWidth}
      />

      <div className="bg-white max-w-md overflow-hidden relative rounded-lg shadow-xl w-full z-10">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <CheckCircle className="h-16 mb-4 text-emerald-400 w-16" />
          </div>

          <h1 className="font-bold mb-2 sm:text-3xl text-2xl text-center text-emerald-400">
            Purchase Successful!
          </h1>

          <p className="mb-2 text-center">
            We are processing your order now.
          </p>

          <div className="space-y-4">
            <button className="bg-emerald-600 duration-300 flex font-medium hover:bg-emerald-700 items-center justify-center px-4 py-2 rounded-lg text-white transition w-full">
              <HandHeart
                className="mr-2"
                size={18}
              />
              Thanks for choosing Baxter Gardens!
            </button>

            <Link
              className="bg-gray-700 duration-300 flex font-bold hover:bg-gray-600 items-center justify-center px-4 py-2 rounded-lg text-emerald-400 transition w-full"
              to={"/"}
            >
              Continue Shopping
              <ArrowRight
                className="ml-2"
                size={18}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PurchaseSuccessPage;
