import express from "express";
import Member from "../models/Member.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// ✅ Middleware to protect routes (require login)
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// 👉 Add Member (secured)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const member = new Member({
      name,
      email,
      role,
      joinedAt: new Date(),
    });

    await member.save();
    res.status(201).json({ message: "Member added successfully ✅", member });
  } catch (err) {
    res.status(500).json({ message: "Error adding member", error: err.message });
  }
});

// 👉 Get All Members (public)
router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: "Error fetching members", error: err.message });
  }
});

// 👉 Get Single Member (public)
router.get("/:id", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: "Error fetching member", error: err.message });
  }
});

// 👉 Update Member (secured)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    );
    res.json({ message: "Member updated ✅", member });
  } catch (err) {
    res.status(500).json({ message: "Error updating member", error: err.message });
  }
});

// 👉 Delete Member (secured)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: "Member deleted 🗑️" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting member", error: err.message });
  }
});

export default router;
