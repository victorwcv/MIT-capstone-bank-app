import express from "express";
import mongoose from "mongoose";
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
app.use(express.json());

const _LOCAL_PORT = 3000;

app.listen(_LOCAL_PORT, () => {
  console.log(`Server running on http://localhost:${_LOCAL_PORT}`);
});

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);


