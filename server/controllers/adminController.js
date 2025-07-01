import Admin from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendSMS } from "../utlis/sendSMS.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "10h";

// Login
export const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(401).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: admin._id, username: admin.username, role: "admin" },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  res.json({ token });
};

// Forgot password - send otp
export const forgotPassword = async (req, res) => {
    
  const admin = await Admin.findOne();
  if (!admin) return res.status(404).json({ error: "Admin not configured" });

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  admin.otp = otp;
  admin.otpExpires = expires;
  await admin.save();

  await sendSMS(admin.phone, `Your OTP is ${otp}`);

  res.json({ message: "OTP sent to registered number" });
};

// Verify otp
export const verifyOtp = async (req, res) => {
  const { otp } = req.body;

  const admin = await Admin.findOne();
  if (!admin) return res.status(404).json({ error: "Admin not configured" });

  if (!admin.otp || admin.otp !== otp || admin.otpExpires < new Date()) {
    return res.status(400).json({ error: "Invalid or expired OTP" });
  }

  res.json({ message: "OTP verified" });
};

// Rest password
export const resetPassword = async (req, res) => {
  const { newPassword, otp } = req.body;

  const admin = await Admin.findOne();
  if (!admin) return res.status(404).json({ error: "Admin not configured" });

  if (!admin.otp || admin.otp !== otp || admin.otpExpires < new Date()) {
    return res.status(400).json({ error: "Invalid or expired OTP" });
  }

  // Hash new password
  const hashed = await bcrypt.hash(newPassword, 10);
  admin.password = hashed;

  // Invalidate OTP immediately
  admin.otp = undefined;
  admin.otpExpires = undefined;

  await admin.save();

  // Issue new JWT (auto-login)
  const token = jwt.sign(
    { id: admin._id, username: admin.username, role: "admin" },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  res.json({ message: "Password updated successfully", token });
};
