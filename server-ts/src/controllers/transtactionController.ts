import { Request, Response, NextFunction } from "express";
import { accountService, transactionService } from "@/services";

export const createTransactionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount, type, currency, originAccountId, destinationAccountId, description } = req.body;

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.error("Amount must be a positive number", 400);
    }

    const originAccount = originAccountId
      ? await accountService.getAccountById(originAccountId)
      : null;
    const destinationAccount = destinationAccountId
      ? await accountService.getAccountById(destinationAccountId)
      : null;


    switch (type) {
      case "deposit":
        if (!destinationAccount) {
          return res.error("Destination account not found", 400);
        }
        break;

      case "withdraw":
        if (!originAccount) {
          return res.error("Origin account not found", 400);
        }
        break;

      case "transfer":
        if (!originAccount || !destinationAccount) {
          return res.error("Origin or destination account not found", 400);
        }
        if (originAccountId === destinationAccountId) {
          return res.error("Origin and destination accounts must be different", 400);
        }
        break;

      default:
        return res.error("Invalid transaction type", 400);
    }

    const newTransaction = {
      amount: parsedAmount,
      currency,
      type,
      originAccountId,
      destinationAccountId,
      description,
    };

    const transaction = await transactionService.createTransaction(newTransaction);
    if (!transaction) {
      return res.error("Failed to create transaction", 500);
    }

    if (type === "deposit" && destinationAccount) {
      destinationAccount.balance += parsedAmount;
      await destinationAccount.save();
    }

    if (type === "withdraw" && originAccount) {
      if (originAccount.balance < parsedAmount) {
        return res.error("Insufficient funds", 400);
      }
      originAccount.balance -= parsedAmount;
      await originAccount.save();
    }

    if (type === "transfer" && originAccount && destinationAccount) {
      if (originAccount.balance < parsedAmount) {
        return res.error("Insufficient funds", 400);
      }
      originAccount.balance -= parsedAmount;
      destinationAccount.balance += parsedAmount;
      await originAccount.save();
      await destinationAccount.save();
    }

    const accountUpdated = await accountService.getAccountById(destinationAccountId);


    return res.success({ transaction, accountUpdated }, "Transaction created successfully", 201);
  } catch (error) {
    next(error);
  }
};
