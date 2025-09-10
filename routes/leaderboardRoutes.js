import express from "express";
import {getAllTimeLeaderboard,getWeeklyLeaderboard,getMonthlyLeaderboard} from "../controllers/leaderboardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/allTime", protect, getAllTimeLeaderboard);
router.get("/weekly", protect, getWeeklyLeaderboard);
router.get("/monthly", protect, getMonthlyLeaderboard);

export default router;
