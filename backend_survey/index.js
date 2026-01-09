import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import surveyRoutes from "./routes/surveyRoutes.js";

dotenv.config();
const app = express();

// Simple CORS
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Survey API is running!" });
});

// DB connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/surveys", surveyRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});