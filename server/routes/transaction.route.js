import express from "express";
import { cookieJwtAuth } from "../middlewares/cookieJwtAuth.js";
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

/** 
 * @swagger
 * 
 * tags:
 *   - name: "Transaction"
 *     description: "Routs for transactions"
 * 
 * /api/transaction/:
 *   get:
 *     summary: Get user transactions
 *     tags: 
 *       - 'Transaction'
 *     description: Get all transactions data from database of the current user
 *     responses:
 *       200:
 *         description: Success.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 * 
 * /api/transaction/deposit:
 *   patch:
 *     summary: Deposit money
 *     tags: 
 *       - 'Transaction'
 *     description: Deposit money
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               destinationAccount:
 *                 type: string
 *               transactionDate:
 *                 type: string
 *               transactionTime:
 *                 type: string
 * 
 * /api/transaction/withdrawal:
 *   patch:
 *     summary: Withdraw money
 *     tags: 
 *       - 'Transaction'
 *     description: Withdraw money
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               originAccount:
 *                 type: string
 *               transactionDate:
 *                 type: string
 *               transactionTime:
 *                 type: string
 * 
 * /api/transaction/new-account:
 *   patch:
 *     summary: Open new account
 *     tags: 
 *       - 'Transaction'
 *     description: Open new account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountBalance:
 *                 type: number
 * 
 * /api/transaction/bank-transfer:
 *   patch:
 *     summary: Bank transfer
 *     tags: 
 *       - 'Transaction'
 *     description: Bank transfer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               originAccount:
 *                 type: string
 *               destinationAccount:
 *                 type: string
 *               typeAccount:
 *                 type: string
 *               transactionDate:
 *                 type: string
 *               transactionTime:
 *                 type: string
 * 
 * /api/transaction/pay-bill:
 *   patch:
 *     summary: Pay bill
 *     tags: 
 *       - 'Transaction'
 *     description: Pay bill
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               originAccount:
 *                 type: string
 *               destinationAccount:
 *                 type: string
 *               typeAccount:
 *                 type: string
 *               transactionDate:
 *                 type: string
 *               transactionTime:
 *                 type: string
 * 
 * /api/transaction/close-account:
 *   patch:
 *     summary: Close account
 *     tags: 
 *       - 'Transaction'
 *     description: Close account
 *     requestBody:
 *       required: true
 *       content:   
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountBalance:
 *                 type: number
 * 
 */