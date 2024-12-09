import { Schema, model, Document } from "mongoose";

const ContactMessageSchema = new Schema({
  userId: { type: String, ref: "User" }, // Optional user reference
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ContactMessage = model("ContactMessage", ContactMessageSchema);

export default ContactMessage;
