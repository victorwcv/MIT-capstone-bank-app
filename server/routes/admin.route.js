import express from 'express';
import { cookieJwtAuth } from '../middlewares/cookieJwtAuth.js';
import { allData, createNewAdmin, searchUser, deleteUser } from '../controllers/admin.controller.js';

const router = express.Router();

//Admin routes

router.get('/all-data', cookieJwtAuth, allData);
router.post('/create-new-admin', cookieJwtAuth, createNewAdmin);
router.get('/search-user/:email', cookieJwtAuth, searchUser);
router.delete('/delete-user/:_id', cookieJwtAuth, deleteUser);

export default router

/**
 * @swagger
 * 
 * tags:
 *   - name: "Admin"
 *     description: "Routs for admin"
 * 
 * /api/admin/all-data:
 *   get:
 *     summary: Get all users
 *     tags: 
 *       - 'Admin'
 *     description: Get all users data from database
 *     
 *     responses:
 *       200:
 *         description: Success.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 * 
 * /api/admin/create-new-admin:
 *   post:
 *     summary: Create a new admin
 *     tags:
 *       - 'Admin'
 *     description: Create a new admin in the database using email and password as credentials
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
 *       201:
 *         description: Admin created successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 * 
 * /api/admin/search-user/:email:
 *   get:
 *     summary: Search user
 *     tags:
 *       - 'Admin'
 *     description: Search user by email
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         example: 7d2v5@example.com
 *     responses:
 *       200:
 *         description: User found.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 * 
 * /api/admin/delete-user/:_id:
 *   delete:
 *     summary: Delete user
 *     tags:
 *       - 'Admin'
 *     description: Delete an existing user from the database by ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         example: 5f9c8e9e9c8e9e9e9c8e9e9e
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 *  
 */