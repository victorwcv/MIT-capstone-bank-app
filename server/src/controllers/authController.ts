import { Request, Response, NextFunction } from "express";
import { accountService, authService } from "@/services";
import { generateToken } from "@/utils";

export const loginUserController = async (req: Request, res: Response, next: NextFunction) => {
  const { documentId, password } = req.body;
  try {
    if (!documentId || !password) {
      res.error("Missing required fields", 400);
      return;
    }

    const user = await authService.authenticateUser(documentId, password);
    if (!user) {
      res.error("Invalid credentials", 401);
      return;
    }
    const accounts = await accountService.getUserAccounts(user.id);

    const token = generateToken({ id: user.id });
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000,
      })
      .success({ user: { ...user }, accounts: { ...accounts }, token }, "Login successful", 200);
    console.log("✅ User logged in successfully");
  } catch (error) {
    next(error);
  }
};

export const logoutUserController = (req: Request, res: Response) => {
  res.clearCookie("token").success({}, "Logout successful", 200);
  console.log("✅ User logged out successfully");
};
