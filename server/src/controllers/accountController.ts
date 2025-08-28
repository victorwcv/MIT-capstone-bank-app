import { Request, Response, NextFunction } from "express";
import { accountService } from "@/services";

export const getUserAccountsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    const accounts = await accountService.getUserAccounts(userId);
    res.success(accounts, "Accounts retrieved successfully", 200);
  } catch (error) {
    next(error);
  }
};
