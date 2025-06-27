import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  likedCount: Number
}, { timestamps: true });

export default mongoose.model("Product", productSchema);