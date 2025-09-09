import express from "express";
import Event from "../models/Event.js";
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

// 👉 Create Event (secured)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const event = new Event({
      title,
      description,
      date,
      createdBy: req.userId,
    });

    await event.save();
    res.status(201).json({ message: "Event created successfully 🚀", event });
  } catch (err) {
    res.status(500).json({ message: "Error creating event", error: err.message });
  }
});

// 👉 Get All Events (public)
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name email");
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events", error: err.message });
  }
});

// 👉 Get Single Event (public)
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("createdBy", "name email");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Error fetching event", error: err.message });
  }
});

// 👉 Update Event (secured)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, date },
      { new: true }
    );
    res.json({ message: "Event updated ✅", event });
  } catch (err) {
    res.status(500).json({ message: "Error updating event", error: err.message });
  }
});

// 👉 Delete Event (secured)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted 🗑️" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting event", error: err.message });
  }
});

export default router;
