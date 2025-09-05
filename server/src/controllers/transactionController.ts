import { successResponse } from "@/utils";
import { NextFunction, Request, Response } from "express";
import { transactionService } from "@/services";

export const getAllTransactionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const pageNumber = parseInt(page as string, 10) || 1;
  const limitNumber = parseInt(limit as string, 10) || 10;

  try {
    // Tu lógica de paginación aquí
    const transactions = await transactionService.getTransactions(userId, pageNumber, limitNumber);
    const total = await transactionService.getTotalTransactions(userId);
    const meta = { page: pageNumber, limit: limitNumber, total };

    return res
      .status(200)
      .json(successResponse(transactions, "Transactions retrieved successfully", meta));
  } catch (error) {
    next(error);
  }
};
