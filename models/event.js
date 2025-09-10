import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    totalSeats: { type: Number, required: true },
    availableSeats: { type: Number, required: true },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
    registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
  },
  { timestamps: true }
);

eventSchema.pre("save", function (next) {
  if (this.isNew) {
    this.availableSeats = this.totalSeats;
  }
  next();
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
