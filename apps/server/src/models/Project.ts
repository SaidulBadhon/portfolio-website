import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [String],
    gradient: String,
    icon: String,
    type: String,
    image: String,
    logo: String,
    images: [String],
    videos: [String],
    longDescription: String,
    features: [String],
    technologies: [String],
    role: String,
    duration: String,
    links: {
      live: String,
      github: String,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
