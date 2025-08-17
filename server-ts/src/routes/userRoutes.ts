import { Router } from "express";
import { getAllUsersController, createUserController } from "@/controllers";

const router = Router();

router.post("/", createUserController);
router.get("/", getAllUsersController);

export { router };