import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    color: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Skill = mongoose.model("Skill", skillSchema);
