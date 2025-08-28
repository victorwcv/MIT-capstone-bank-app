import { Request, Response, NextFunction } from "express";

export const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  res.success = (data: any, message = "Request successful", status = 200) => {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  };

  res.error = (message = "Internal server error", status = 500, errors?: any) => {
    return res.status(status).json({
      success: false,
      message,
      errors,
    });
  };

  next();
};

// Extiende los tipos de Express para evitar errores de TypeScript
declare global {
  namespace Express {
    interface Response {
      success: (data: any, message?: string, status?: number) => Response;
      error: (message?: string, status?: number, errors?: any) => Response;
    }
  }
}
