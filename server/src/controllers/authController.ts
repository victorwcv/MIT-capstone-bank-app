import { Request, Response, NextFunction } from "express";
import { accountService, authService } from "@/services";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "@/utils";

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  const { documentId, password } = req.body;
  try {
    const user = await authService.authenticateUser(documentId, password);
    const accessToken = generateAccessToken({ id: user.id });
    const refreshToken = generateRefreshToken({ id: user.id });
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/api/v1/auth/refresh",
      })
      .success({ user: { ...user }, accessToken }, "Login successful", 200);
    console.log("✅ User logged in successfully");
  } catch (error) {
    next(error);
  }
};

export const refreshController = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.cookies;
  try {
    const decoded: any = verifyRefreshToken(refreshToken);
    const accessToken = generateAccessToken({ id: decoded.id });
    res.success({ accessToken }, "Token refreshed successfully", 200);
  } catch (error) {
    next(error);
  }
};

export const logoutController = (_req: Request, res: Response) => {
  res.clearCookie("refreshToken").json({ message: "User logged out successfully" });
  console.log("✅ User logged out successfully");
};
