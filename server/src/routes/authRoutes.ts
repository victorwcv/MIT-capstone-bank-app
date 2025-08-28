import { Router } from "express";
import { loginUserController, logoutUserController } from "@/controllers";

const router = Router();

router.post("/", loginUserController);
router.get("/", logoutUserController);

export { router };
