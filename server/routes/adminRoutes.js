import express from "express";
import {
  adminLogin, forgotPassword, resetPassword, verifyOtp,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;