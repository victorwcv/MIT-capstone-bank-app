import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import adminRoute from "./routes/admin.route.js";
import transactionRoute from "./routes/transaction.route.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

dotenv.config();


// Swagger Documentation

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Bank API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Bank API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development Server'
      },
      {
        url: 'https://mit-capstone-bank-app.onrender.com',
        description: 'Production Server'
      },
    ],
    
  },
  apis: ['./routes/*.js'], // files containing annotations
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);



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

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_ORIGIN : process.env.LOCAL_ORIGIN,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Routes

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/transaction", transactionRoute);

// Error Handling middleware 

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});



