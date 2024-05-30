import express from 'express';
import { createAccount, onlineBanking } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/create-account', createAccount)
router.post('/online-banking', onlineBanking)

export default router;