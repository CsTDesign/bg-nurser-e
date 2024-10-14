import {
  LeafyGreen,
  LockKeyhole,
  LogIn,
  LogOut,
  ShoppingCart,
  UserRoundPlus
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const {
    user,
    logout
  } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();
  
  return (
    <header className="backdrop-blur-md bg-opacity-90 bg-white border-b border-emerald-800 duration-300 fixed left-0 shadow-lg top-0 transition-all w-full z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between">
          <Link
            className="flex font-bold items-center space-x-2 text-2xl text-emerald-400"
            to="/"
          >
            <LeafyGreen className="h-8 w-8" />
            Baxter Gardens Nurser-E
          </Link>

          <nav className="flex flex-wrap gap-4 items-center">
            <Link
              className="duration-300 ease-in-out hover:text-emerald-400 transition"
              to={"/"}
            >
              Home
            </Link>

            {
              user && (
                <Link
                  className="duration-300 ease-in-out group hover:text-emerald-400 relative transition"
                  to={"/cart"}
                >
                  <ShoppingCart
                    className="group-hover:text-emerald-400 inline-block mr-1"
                    size={20}
                  />
                  <span className="hidden sm:inline">
                    Cart
                  </span>
                  {
                    cart.length > 0 && (
                      <span className="absolute bg-emerald-500 duration-300 ease-in-out group-hover:bg-emerald-400 -left-2 px-2 py-0.5 rounded-full text-white text-xs -top-2 transition">
                        {cart.length}
                      </span>
                    )
                  }
                </Link>
              )
            }

            {
              isAdmin && (
                <Link
                  className="bg-emerald-700 duration-300 ease-in-out flex font-medium hover:bg-emerald-600 items-center px-3 py-1 rounded-md text-white transition"
                  to={"/admin-panel"}
                >
                  <LockKeyhole
                    className="inline-block mr-1"
                    size={18}
                  />
                  <span>
                    Admin Panel
                  </span>
                </Link>
              )
            }

            {
              user ? (
                <button
                  className="bg-gray-700 duration-300 ease-in-out flex hover:bg-gray-600 items-center px-4 py-2 rounded-md text-white transition"
                  onClick={logout}
                >
                  <LogOut size={18} />
                  <span className="hidden ml-2 sm:inline">
                    Log Out
                  </span>
                </button>
              ) : (
                <>
                  <Link
                    className="bg-emerald-600 duration-300 ease-in-out flex hover:bg-emerald-700 items-center px-4 py-2 rounded-md text-white transition"
                    to={"/signup"}
                  >
                    <UserRoundPlus
                      className="mr-2"
                      size={18}
                    />
                    Sign Up
                  </Link>
                  <Link
                    className="bg-gray-700 duration-300 ease-in-out flex hover:bg-gray-600 items-center px-4 py-2 rounded-md text-white transition"
                    to={"/login"}
                  >
                    <LogIn
                      className="mr-2"
                      size={18}
                    />
                    Login
                  </Link>
                </>
              )
            }
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
