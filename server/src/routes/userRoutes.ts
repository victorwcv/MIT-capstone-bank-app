import { Router } from "express";
import { getAllUsersController, registerUserController } from "@/controllers";

const router = Router();

router.post("/", registerUserController);
router.get("/", getAllUsersController);

export { router };