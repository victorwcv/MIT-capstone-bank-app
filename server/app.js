import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"

dotenv.config();

// Mongo Database connection
mongoose
  .connect(process.env._MONGO_DB)
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log(err);
  });


// Server app
const app = express();
app.disable('x-powered-by')
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

app.use((err, req, res, next)=> {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  })
})