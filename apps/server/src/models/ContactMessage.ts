import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    senderEmail: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const ContactMessage = mongoose.model(
  "ContactMessage",
  contactMessageSchema
);
