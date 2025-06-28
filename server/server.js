import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/dbConnection.js";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

// Connect DB
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
