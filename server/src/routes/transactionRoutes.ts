import { depositController, withdrawController, transferController } from "@/controllers";
import { authMiddleware } from "@/middlewares";
import { Router } from "express";

const router = Router();

router.post("/deposit/:userAccountId", authMiddleware, depositController);
router.post("/withdraw", authMiddleware, withdrawController);
router.post("/transfer", authMiddleware, transferController);

export { router };
