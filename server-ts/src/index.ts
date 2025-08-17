import express from "express";
import dotenv from "dotenv";
import { connectDB } from "@/config";
import { testRoutes, userRoutes } from "@/routes";
import { responseHandler, errorHandler} from "@/middlewares";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(responseHandler);

app.use("/api/v1/test", testRoutes);
app.use("/api/v1/users", userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
