import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env._MONGO_DB) {
  throw new Error("MONGO_DB is not defined");
}
const MONGO_URI =
  process.env.NODE_ENV === "development"
    ? "mongodb://localhost:27017/banking-app"
    : process.env._MONGO_DB;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

/* server local url: http://localhost:5000 */
