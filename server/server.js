import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/dbConnection.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

// Connect DB
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
