import express from "express";
import { getMembers , getMemberById } from "../controllers/memberController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/allMembers", protect, getMembers);
router.get("/member/:id", protect, getMemberById);

export default router;
