import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongo.js";
import authRoutes from "./routes/authRoutes.js"; // notice the .js extension
import eventRoutes from "./routes/eventRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import userRoutes from "./routes/userRoutes.js";



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend running 🚀" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
