import express from 'express';
import { cookieJwtAuth } from '../middlewares/cookieJWTAuth.js';
import { allData,  createNewAdmin , searchUser} from '../controllers/admin.controller.js';

const router = express.Router();

router.get('/all-data',cookieJwtAuth, allData);
router.post('/create-new-admin',cookieJwtAuth, createNewAdmin);
router.get('/search-user/:email',cookieJwtAuth, searchUser);

export default router