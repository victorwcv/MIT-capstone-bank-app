import { Request, Response, NextFunction } from "express";

export const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  res.success = (data: any, message = "Request successful", status = 200) => {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  };

  next();
};

declare global {
  namespace Express {
    interface Response {
      success: (data: any, message?: string, status?: number) => Response;
    }
  }
}
