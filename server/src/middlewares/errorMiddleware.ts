import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("🔥 Error:", err);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  return res.status(status).json({
    success: false,
    message,
    // Solo mostramos más detalles si estás en desarrollo
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
