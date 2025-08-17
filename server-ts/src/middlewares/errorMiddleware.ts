import { Request, Response, NextFunction } from "express";

// Clase opcional para errores controlados
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Para que no se pierda el stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

// Middleware de manejo de errores
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("🔥 Error:", err);

  // Si el error viene de AppError, usamos su info
  const status = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof AppError ? err.message : "Internal server error";

  return res.status(status).json({
    success: false,
    message,
    // Solo mostramos más detalles si estás en desarrollo
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
