import express from 'express';
import { allData } from '../controllers/admin.controller.js';
import { cookieJwtAuth } from '../middlewares/cookieJWTAuth.js';

const router = express.Router();

router.get('/all-data',cookieJwtAuth, allData);

export default router