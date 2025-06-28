import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  otp: { type: String },
  otpExpires: { type: Date },
});

export default mongoose.model("Admin", adminSchema);