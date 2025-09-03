import { Request, Response, NextFunction } from "express";
import { accountService } from "@/services";
import { successResponse } from "@/utils";

export const getUserAccountsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    const accounts = await accountService.getUserAccounts(userId);
    res.status(200).json(successResponse(accounts, "Accounts retrieved successfully"));
  } catch (error) {
    next(error);
  }
};
