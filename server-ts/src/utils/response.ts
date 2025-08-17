import { Response } from "express";

export const successResponse = (
  res: Response,
  message: string,
  data: any = {},
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    error: null,
  });
};

export const errorResponse = (
  res: Response,
  message: string,
  error: any = {},
  statusCode = 500
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
    error,
  });
};
