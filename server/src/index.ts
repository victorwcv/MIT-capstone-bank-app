import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB, corsSetup } from "@/config";
import { accountRoutes, authRoutes, testRoutes, transactionRoutes, userRoutes } from "@/routes";
import { errorHandler } from "@/middlewares";

dotenv.config();

const app = express();

connectDB();

app.use(corsSetup());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/accounts", accountRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running at port ${PORT}`);
});
