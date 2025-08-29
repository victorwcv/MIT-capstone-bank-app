import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "@/config";
import { accountRoutes, authRoutes, testRoutes, transactionRoutes, userRoutes } from "@/routes";
import { responseHandler, errorHandler } from "@/middlewares";

dotenv.config();

const app = express();

const ORIGIN =
  process.env.NODE_ENV === "development" ? "http://localhost:5173" : "https://victorwcv.github.io";

const corsOptions: cors.CorsOptions = {
  origin: ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(responseHandler);

app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/accounts", accountRoutes);

app.use(errorHandler);

const HOST =
  process.env.NODE_ENV === "development"
    ? "http://localhost"
    : "https://mit-capstone-bank-app.onrender.com";
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running at ${HOST}:${PORT}`);
});
