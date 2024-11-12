import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
  const {
    removeFromCart,
    updateQuantity
  } = useCartStore();

  return (
    <div className="bg-white border border-gray-700 md:p-6 p-4 rounded-lg shadow-sm">
      <div className="md:flex md:gap-6 md:items-center md:justify-between md:space-y-0 space-y-4">
        <div className="md:order-1 shrink-0">
          <img
            className="h-20 md:h-32 object-cover rounded"
            src={item.image}
          />
        </div>
        <label className="sr-only">
          Choose quantity:
        </label>

        <div className="flex items-center justify-between md:justify-end md:order-3">
          <div className="flex gap-2 items-center">
            <button
              className="bg-gray-300 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-5 hover:bg-gray-200 inline-flex items-center justify-center rounded-md shrink-0 w-5"
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
            >
              <Minus className="text-gray-600" />
            </button>
            <p>
              {item.quantity}
            </p>
            <button
              className="bg-gray-300 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-5 hover:bg-gray-200 inline-flex items-center justify-center rounded-md shrink-0 w-5"
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              <Plus className="text-gray-600" />
            </button>
          </div>

          <div className="md:order-4 md:w-32 text-end">
            <p className="font-bold text-base text-emerald-400">
              ${item.price}
            </p>
          </div>
        </div>

        <div className="flex-1 md:max-w-md md:order-2 min-w-0 space-y-4 w-full">
          <p className="font-medium hover:text-emerald-400 hover:underline text-base">
            {item.name}
          </p>

          <p className="text-sm whitespace-pre-line">
            {item.description}
          </p>

          <div className="flex gap-4 items-center">
            <button
              className="font-medium hover:text-red-300 hover:underline inline-flex items-center text-red-400 text-sm"
              onClick={() => removeFromCart(item._id)}
            >
              <Trash2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
