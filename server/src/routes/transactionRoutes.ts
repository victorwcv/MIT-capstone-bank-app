import { getAllTransactionsController } from "@/controllers";
import { authMiddleware } from "@/middlewares";
import { Router } from "express";

const router = Router();

router.get("/:userId", authMiddleware, getAllTransactionsController);


export { router };