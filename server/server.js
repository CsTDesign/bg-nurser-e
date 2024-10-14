// Import packages
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

// Import DB
import { connectDB } from "./lib/db.js";

// Import routes
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import couponRoutes from "./routes/couponRoute.js";
import paymentRoutes from "./routes/paymentRoute.js";
import analyticsRoutes from "./routes/analyticsRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" })); // Parses body requests

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(
      __dirname,
      "client",
      "dist",
      "index.html"
    ));
  });
}

app.listen(PORT, () => {
  console.log("Server now running on http://localhost:" + PORT);
  connectDB();
});
