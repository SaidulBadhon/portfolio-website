import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    companyLogo: String,
    location: String,
    description: String,
    icon: String,
    date: String,
  },
  { timestamps: true }
);

export const Experience = mongoose.model("Experience", experienceSchema);
