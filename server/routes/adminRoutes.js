import express from "express";
import {
  adminLogin, sendOTP, resetPassword, updateAdminProfile, verifyOtp,
} from "../controllers/adminController.js";
import { adminAuth } from "../middlewares/adminAuth.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/send-otp", sendOTP);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.post("/update", adminAuth, updateAdminProfile);

export default router;