import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductDetails,
  updateProduct,
  deleteProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/", deleteProducts);
router.get("/:id", getProductDetails);

export default router;