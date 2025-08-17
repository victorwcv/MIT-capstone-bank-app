import express from "express";
import dotenv from "dotenv";
import { connectDB } from "@/config";
import { testRoutes, userRoutes } from "@/routes";

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.use("/api/v1/test", testRoutes);
app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
