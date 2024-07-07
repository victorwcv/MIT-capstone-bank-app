import express from "express";
import {
  createAccount,
  onlineBanking,
  signout,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Auth routes

router.post("/create-account", createAccount);
router.post("/online-banking", onlineBanking);
router.get("/signout", signout);

export default router;


/**
 * @swagger
 * 
 * tags:
 *   - name: "Auth"
 *     description: "Routs for authentication"
 * 
 * /api/auth/create-account:
 *   post:
 *     summary: Create a new user
 *     tags: 
 *       - 'Auth'
 *     description: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *             required:
 *               - email
 *               - username
 *               - password
 *               - address
 *               - phone
 *             example:
 *               email: 7d2v5@example.com
 *               username: JohnDoe
 *               password: password
 *               address: 123 Main St
 *               phone: 5555555555
 *     responses:
 *       201:
 *         description: User created successfully.
 *       409:
 *         description: User already exists.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 * 
 * /api/auth/online-banking:
 *   post:
 *     summary: Online banking
 *     tags: 
 *       - 'Auth'
 *     description: Online banking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *             example:
 *               email: 7d2v5@example.com
 *               password: password
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       401:
 *         description: Invalid email or password.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 * 
 * /api/auth/signout:
 *   get:
 *     summary: Sign out
 *     tags:
 *       - 'Auth'
 *     description: Sign out
 *     responses:
 *       200:
 *         description: User signed out successfully.
 */