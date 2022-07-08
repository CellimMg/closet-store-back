import { Router } from "express";
import { createProduct, readProduct } from "../controllers/productsController.js";

const router = Router();

router.post("/products", createProduct);
router.get("/products", readProduct);

export default router;
