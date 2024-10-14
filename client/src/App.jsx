import {
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

function App() {
  const {
    user,
    checkAuth,
    checkingAuth
  } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;
    
    getCartItems();
  }, [
    getCartItems,
    user
  ]);

  if (checkingAuth) return <LoadingSpinner />;
  
  return (
    <div className="bg-white min-h-screen overflow-hidden relative">

      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)] h-full left-1/2 top-0 -translate-x-1/2 w-full" />
        </div>
      </div>

      <div className="pt-20 relative z-50">
        <Navbar />

        <Routes>
          <Route
            element={<HomePage />}
            path="/"
          />
          <Route
            element={!user ? <SignupPage /> : <Navigate to="/" />}
            path="/signup"
          />
          <Route
            element={!user ? <LoginPage /> : <Navigate to="/" />}
            path="/login"
          />
          <Route
            element={user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />}
            path="/admin-panel"
          />
          <Route
            element={<CategoryPage />}
            path="/category/:category"
          />
          <Route
            element={user ? <CartPage /> : <Navigate to="/login" />}
            path="/cart"
          />
          <Route
            element={user ? <PurchaseSuccessPage /> : <Navigate to="/login" />}
            path="/purchase-success"
          />
          <Route
            element={user ? <PurchaseCancelPage /> : <Navigate to="/login" />}
            path="/purchase-cancel"
          />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
