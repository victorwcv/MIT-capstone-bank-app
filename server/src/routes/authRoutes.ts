import { Router } from "express";
import { loginController, logoutController, refreshController } from "@/controllers";

const router = Router();

router.post("/login", loginController);
router.get("/logout", logoutController);
router.post("/refresh", refreshController);

export { router };
