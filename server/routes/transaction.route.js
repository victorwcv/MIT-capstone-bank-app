import express from "express";
import { cookieJwtAuth } from "../middlewares/cookieJWTAuth.js";
import { bankTransfer, closeAccount, deposit, newAccount, payBill, userData, withdrawal } from "../controllers/transaction.controller.js";

const router = express.Router();

router.get('/', cookieJwtAuth, userData);
router.patch('/deposit', cookieJwtAuth, deposit);
router.patch('/withdrawal', cookieJwtAuth, withdrawal);
router.patch('/new-account', cookieJwtAuth, newAccount);
router.patch('/bank-transfer', cookieJwtAuth, bankTransfer);
router.patch('/pay-bill', cookieJwtAuth, payBill);
router.patch('/close-account', cookieJwtAuth, closeAccount);

export default router;