import Event from "../models/event.js";

const createEvent = async (req, res, next) => {
  try {
    const { title, description, date, time, location, totalSeats } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      createdBy: req.user._id,
    });

    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find({})
      .populate("createdBy", "name email role")
      .sort({ date: 1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
};

const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate("registeredUsers", "name email");

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event);
  } catch (err) {
    next(err);
  }
};

const registerForEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.registeredUsers.includes(req.user._id)) {
      return res.status(400).json({ message: "User already registered" });
    }

    event.registeredUsers.push(req.user._id);
    await event.save();

    res.json({ message: "Registered successfully", event });
  } catch (err) {
    next(err);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (
      req.user.role !== "admin" &&
      event.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized to delete this event" });
    }

    await event.deleteOne();
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export { createEvent, getEvents, getEventById, registerForEvent, deleteEvent };
