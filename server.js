import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongo.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import leaderBoard from "./routes/leaderboardRoutes.js";

dotenv.config();

const app = express();


app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leaderboard", leaderBoard);

app.get("/", (req, res) => {
  res.json({ message: "Backend running 🚀" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
