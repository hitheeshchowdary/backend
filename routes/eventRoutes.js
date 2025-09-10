import express from "express";
import {createEvent,getEvents,getEventById,registerForEvent,deleteEvent} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/allEvents", protect, getEvents);
router.get("/event/:id", protect, getEventById);
router.post("/createEvent", protect, createEvent);
router.post("/:id/register", protect, registerForEvent);
router.delete("/:id", protect, deleteEvent);

export default router;
