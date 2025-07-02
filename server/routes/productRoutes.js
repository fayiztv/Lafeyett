import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductDetails,
  updateProduct,
  deleteProducts,
  incrementLikedCount,
  decrementLikedCount,
} from "../controllers/productController.js";
import { adminAuth } from "../middlewares/adminAuth.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", adminAuth, createProduct);
router.get("/:id", getProductDetails);
router.post("/:id", adminAuth, updateProduct);
router.delete("/", adminAuth, deleteProducts);
router.post("/:id/like", incrementLikedCount);
router.post("/:id/unlike", decrementLikedCount);

export default router;