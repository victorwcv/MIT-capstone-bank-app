import express from "express";
import { cookieJwtAuth } from "../middlewares/cookieJwtAuth.js";
import { test } from "../controllers/user.controller.js";

const router = express.Router();

router.get('/', test);



export default router;