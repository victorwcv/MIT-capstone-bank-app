import express from "express";
import { deposit, test } from "../controllers/user.controller.js";
import { cookieJwtAuth } from "../middlewares/cookieJWTAuth.js";

const router = express.Router();

router.get('/', test);
router.post('/transactions/deposit', cookieJwtAuth, deposit);

export default router;