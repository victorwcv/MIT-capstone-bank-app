import { Request, Response, NextFunction } from "express";
import { accountService, transactionService } from "@/services";
import { ITransaction } from "@/models";

export const depositController = async (req: Request, res: Response, next: NextFunction) => {
  const { amount, currency, description } = req.body;
  const { userAccountId } = req.params;

  try {
    const newDeposit: Partial<ITransaction> = {
      amount,
      type: "deposit",
      currency,
      description,
      userAccountId,
    };
    console.log("userAccountId", userAccountId)
    const accountUpdated = await accountService.deposit(userAccountId, amount, currency);
    const transaction = await transactionService.saveTransaction(newDeposit);

    res.success({ accountUpdated, transaction }, "Deposit successful" );
    console.log("✅ Deposit successful")
  } catch (error) {
    next(error);
  }
};

export const withdrawController = async (req: Request, res: Response, next: NextFunction) => {};

export const transferController = async (req: Request, res: Response, next: NextFunction) => {};
