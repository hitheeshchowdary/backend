import express from "express";
import { registerUser, loginUser} from "../controllers/auth.js";


const router = express.Router();

// 👉 Signup
router.post("/register",registerUser);
router.post("/login", loginUser);

export default router;
