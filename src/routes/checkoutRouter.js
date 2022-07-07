import express from 'express';
import {checkout} from '../controllers/checkoutController.js'
import { validadeCreditCard } from '../middlewares/validadeCreditCard.js';
import { validateAdress } from '../middlewares/validateAdress.js';
import { validateToken } from '../middlewares/validateToken.js';

const router = express.Router();


router.post("/checkout", validateToken, validateAdress, validadeCreditCard, checkout);

export default router;