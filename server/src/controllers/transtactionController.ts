import { Request, Response, NextFunction } from "express";
import { accountService, transactionService } from "@/services";
import { ITransaction } from "@/models";
import { successResponse } from "@/utils";

export const depositController = async (req: Request, res: Response, next: NextFunction) => {
  const { amount, currency, description, userAccountId } = req.body;

  try {
    const newDeposit: Partial<ITransaction> = {
      amount,
      type: "deposit",
      currency,
      description,
      userAccountId,
    };
    const accountUpdated = await accountService.deposit(userAccountId, amount, currency);
    const transaction = await transactionService.saveTransaction(newDeposit);

    res.status(201).json(successResponse({ accountUpdated, transaction }, "Deposit successful"));
    console.log("✅ Deposit successful")
  } catch (error) {
    next(error);
  }
};

export const withdrawController = async (req: Request, res: Response, next: NextFunction) => {
  const { amount, currency, description, userAccountId } = req.body;

  try {
    const newWithdraw: Partial<ITransaction> = {
      amount,
      type: "withdraw",
      currency,
      description,
      userAccountId,
    };
    const accountUpdated = await accountService.withdraw(userAccountId, amount, currency);
    const transaction = await transactionService.saveTransaction(newWithdraw);
    res.status(201).json(successResponse({ accountUpdated, transaction }, "Withdraw successful"));
    console.log("✅ Withdraw successful");
  } catch (error) {
    next(error);
  }
};

export const transferController = async (req: Request, res: Response, next: NextFunction) => {};
