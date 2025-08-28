import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token) {
    return res.error("Unauthorized, no token provided", 401);
  }

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.error("Unauthorized, invalid token", 401);
  }
};
