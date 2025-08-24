import { createTransactionController } from "@/controllers";
import { authMiddleware } from "@/middlewares";
import { Router } from "express";

const router = Router();

router.post("/", authMiddleware, createTransactionController);

export { router };
