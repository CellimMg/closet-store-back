import express from 'express';
import { signup } from '../controllers/authController.js';
import { validateSignup } from '../middlewares/validateSignup.js';

const router = express.Router();

router.post("/signup", validateSignup, signup);

export default router;