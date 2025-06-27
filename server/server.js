import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();


app.use(cors());
app.use(express.json());



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
