import express from "express";
import { deposit, test, userData, withdrawal, newAccount } from "../controllers/user.controller.js";
import { cookieJwtAuth } from "../middlewares/cookieJWTAuth.js";

const router = express.Router();

router.get('/', test);
router.get('/transactions/user-data', cookieJwtAuth, userData)
router.patch('/transactions/deposit', cookieJwtAuth, deposit);
router.patch('/transactions/withdrawal', cookieJwtAuth, withdrawal);
router.put('/transactions/new-account', cookieJwtAuth, newAccount);

export default router;