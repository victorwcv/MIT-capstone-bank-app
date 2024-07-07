import express from "express";
import { test } from "../controllers/user.controller.js";


const router = express.Router();

// User routes

router.get('/', test);

export default router;


/**
 * @swagger
 * 
 * tags:
 *   - name: "User"
 *     description: "Routs for user"
 * 
 * /api/user/:
 *   get:
 *     summary: Test the user route
 *     tags: 
 *       - 'User'
 *     description: Test the user Endpoint!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */