import express from 'express';
import { cookieJwtAuth } from '../middlewares/cookieJwtAuth.js';
import { allData, createNewAdmin, searchUser, deleteUser } from '../controllers/admin.controller.js';

const router = express.Router();

router.get('/all-data', cookieJwtAuth, allData);
router.post('/create-new-admin', cookieJwtAuth, createNewAdmin);
router.get('/search-user/:email', cookieJwtAuth, searchUser);
router.delete('/delete-user/:_id', cookieJwtAuth, deleteUser);

export default router