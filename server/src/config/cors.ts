import cors from "cors";

const ORIGIN =
  process.env.NODE_ENV === "development" ? "http://localhost:5173" : "https://victorwcv.github.io";

export const corsSetup = () => {
  const corsOptions: cors.CorsOptions = {
    origin: ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };

  return cors(corsOptions);
};
