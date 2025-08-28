import { Router } from "express";
import { getUserAccountsController } from "@/controllers";
import { authMiddleware } from "@/middlewares";

const router = Router();

router.get("/:userId", authMiddleware, getUserAccountsController);

export { router };