import express from 'express'
import { postResetPassword } from '../controllers/userControllers.js';

const router = express.Router();

router.post("/resetPassword", postResetPassword);

export default router;