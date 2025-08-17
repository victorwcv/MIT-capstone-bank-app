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
  });
};

export const errorResponse = (
  res: Response,
  message: string,
  code: string,
  details: any = null,
  statusCode = 400
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: {
      code,
      details,
    },
  });
};
