import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,
  signup: async ({
    name,
    email,
    password,
    confirmPassword
  }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post("/auth/signup", {
        name,
        email,
        password
      });
      set({
        user: res.data,
        loading: false
      });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An error occurred during signup");
    }
  },
  login: async (email, password) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/login", {
        email,
        password
      });
      set({
        user: res.data,
        loading: false
      });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An error occurred during login");
    }
  },
  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred during logout");
    }
  },
  checkAuth: async () => {
    set({ checkingAuth: true });

    try {
      console.log("checking auth")
      const response = await axios.get("/auth/profile");
      console.log("auth successful")
      set({
        user: response.data,
        checkingAuth: false
      });
    } catch (error) {
      console.log("auth check error" ,error.message);
      set({
        checkingAuth: false,
        user: null
      });
    }
  },
  refreshToken: async () => {
    // Prevents multiple simultaneous refresh attempts
    if (get.checkingAuth) return;
    set({ checkingAuth: true });

    try {
      const response = await axios.post("/auth/refresh-token");
      set({ checkingAuth: false });
      return response.data;
    } catch (error) {
      set({
        checkingAuth: false,
        user: null
      });
      throw error;
    }
  }
}));

// Axios interceptor for refresh tokens
let refreshPromise = null;

axios.interceptors.response.use(
  (response) => response, async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // If refresh already in progress, wait for completion
      if (refreshPromise) {
        await refreshPromise;
        return axios(originalRequest);
      }

      // Start new refresh process
      refreshPromise = useUserStore.getState().refreshToken();

      try {
        await refreshPromise;
        refreshPromise = null;

        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login or handle as necessary
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
