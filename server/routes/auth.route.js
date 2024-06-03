import express from "express";
import {
  createAccount,
  onlineBanking,
  signout,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/create-account", createAccount);
router.post("/online-banking", onlineBanking);
router.get("/signout", signout);

export default router;
