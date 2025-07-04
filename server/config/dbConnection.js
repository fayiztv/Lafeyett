import mongoose from "mongoose";

//Db connection
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
};