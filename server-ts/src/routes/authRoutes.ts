import { Router } from "express";
import { loginUserController } from "@/controllers/authController";

const router = Router();


router.post("/", loginUserController);

export { router };