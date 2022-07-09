import { Router } from "express";
import { createCart } from "../controllers/cartController.js";

const router = Router();

router.post("/cart", createCart);

export default router;
