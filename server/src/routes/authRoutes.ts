import { Router } from "express";
import { loginUserController, logoutUserController } from "@/controllers";

const router = Router();

router.post("/login", loginUserController);
router.get("/logout", logoutUserController);

export { router };
