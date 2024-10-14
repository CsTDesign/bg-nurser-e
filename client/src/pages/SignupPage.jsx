import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  KeyRound,
  Loader2,
  Mail,
  UserRound,
  UserRoundPlus
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const SignupPage = () => {
  const [
    formData,
    setFormData
  ] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const {
    signup,
    loading
  } = useUserStore();

  const handleSubmit =(e) => {
    e.preventDefault();
    signup(formData);
  };
  
  return (
    <div className="flex flex-col justify-center lg:px-8 py-12 sm:px-6">
      <motion.div
        animate={{
          opacity: 1,
          y: 0
        }}
        className="mt-8 sm:max-w-md sm:mx-auto sm:w-full"
        initial={{
          opacity: 0,
          y: -20
        }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-extrabold mt-6 text-3xl text-center text-emerald-400">
          New customer account
        </h2>
      </motion.div>

      <motion.div
        animate={{
          opacity: 1,
          y: 0
        }}
        className="mt-8 sm:max-w-md sm:mx-auto sm:w-full"
        initial={{
          opacity: 0,
          y: -20
        }}
        transition={{
          delay: 0.2,
          duration: 0.8
        }}
      >
        <div className="bg-white px-4 py-8 shadow sm:px-10 sm:rounded-lg">
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                className="block font-medium text-sm"
                htmlFor="name"
              >
                Name
              </label>

              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute flex inset-0 items-center left-0 pl-3 pointer-events-none">
                  <UserRound
                    aria-hidden="true"
                    className="h-5 text-gray-400 w-5"
                  />
                </div>

                <input
                  className="bg-white block border border-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 pl-10 placeholder-gray-400 px-3 py-2 rounded-md shadow-sm sm:text-sm w-full"
                  id="name"
                  onChange={(e) => setFormData({
                    ...formData,
                    name: e.target.value
                  })}
                  placeholder="P. Allen Smith"
                  required
                  type="text"
                  value={formData.name}
                />
              </div>
            </div>

            <div>
              <label
                className="block font-medium text-sm"
                htmlFor="email"
              >
                Email
              </label>

              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute flex inset-0 items-center left-0 pl-3 pointer-events-none">
                  <Mail
                    aria-hidden="true"
                    className="h-5 text-gray-400 w-5"
                  />
                </div>

                <input
                  className="bg-white block border border-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 pl-10 placeholder-gray-400 px-3 py-2 rounded-md shadow-sm sm:text-sm w-full"
                  id="email"
                  onChange={(e) => setFormData({
                    ...formData,
                    email: e.target.value
                  })}
                  placeholder="email@email.com"
                  required
                  type="email"
                  value={formData.email}
                />
              </div>
            </div>

            <div>
              <label
                className="block font-medium text-sm"
                htmlFor="password"
              >
                Password
              </label>

              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute flex inset-0 items-center left-0 pl-3 pointer-events-none">
                  <KeyRound
                    aria-hidden="true"
                    className="h-5 text-gray-400 w-5"
                  />
                </div>

                <input
                  className="bg-white block border border-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 pl-10 placeholder-gray-400 px-3 py-2 rounded-md shadow-sm sm:text-sm w-full"
                  id="password"
                  onChange={(e) => setFormData({
                    ...formData,
                    password: e.target.value
                  })}
                  placeholder="******"
                  required
                  type="password"
                  value={formData.password}
                />
              </div>
            </div>

            <div>
              <label
                className="block font-medium text-sm"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>

              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute flex inset-0 items-center left-0 pl-3 pointer-events-none">
                  <KeyRound
                    aria-hidden="true"
                    className="h-5 text-gray-400 w-5"
                  />
                </div>

                <input
                  className="bg-white block border border-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 pl-10 placeholder-gray-400 px-3 py-2 rounded-md shadow-sm sm:text-sm w-full"
                  id="confirmPassword"
                  onChange={(e) => setFormData({
                    ...formData,
                    confirmPassword: e.target.value
                  })}
                  placeholder="******"
                  required
                  type="password"
                  value={formData.confirmPassword}
                />
              </div>
            </div>

            <button
              className="bg-emerald-600 border border-transparent disabled:opacity-50 duration-150 ease-in-out flex focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 font-medium hover:bg-emerald-700 justify-center px-4 py-2 rounded-md shadow-sm text-sm text-white transition w-full"
              disabled={loading}
              type="submit"
            >
              {
                loading ? (
                  <>
                    <Loader2
                      aria-hidden="true"
                      className="animate-spin h-5 mr-2 w-5"
                    />
                    Loading... Please wait
                  </>
                ) : (
                  <>
                    <UserRoundPlus
                      aria-hidden="true"
                      className="h-5 mr-2 w-5"
                    />
                    Sign Up
                  </>
                )
              }
            </button>
          </form>

          <p className="mt-8 text-center text-sm">
            Already have an account?{" "}
            <Link
              className="font-medium hover:text-emerald-300 text-emerald-400"
              to="/login"
            >
              Login
              <ArrowRight className="h-4 inline w-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
