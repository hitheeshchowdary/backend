import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    overAllPoints: { type: Number, default: 0 },
    weeklyPoints: { type: Number, default: 0 },
    monthlyPoints: { type: Number, default: 0 },
    role: { type: String, default: "member" },
    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Member", memberSchema);