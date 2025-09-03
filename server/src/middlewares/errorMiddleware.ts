// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "@/errors/AppError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
  });
};
