import express from "express";
import { getAllProducts, createProduct, updateProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);

export default router;
