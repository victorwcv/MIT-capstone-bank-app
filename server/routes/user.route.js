import express from "express";
import { deposit, test, userData, withdrawal, newAccount, bankTransfer } from "../controllers/user.controller.js";
import { cookieJwtAuth } from "../middlewares/cookieJWTAuth.js";

const router = express.Router();

router.get('/', test);
router.get('/transactions/user-data', cookieJwtAuth, userData)
router.patch('/transactions/deposit', cookieJwtAuth, deposit);
router.patch('/transactions/withdrawal', cookieJwtAuth, withdrawal);
router.patch('/transactions/new-account', cookieJwtAuth, newAccount);
router.patch('/transactions/bank-transfer', cookieJwtAuth, bankTransfer);

export default router;