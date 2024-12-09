import { Schema, model, Document } from "mongoose";

export interface IContactMessage extends Document {
  userId?: string; // Optional: Reference to the User who sent the message
  name: string; // Name of the sender
  email: string; // Email of the sender
  message: string; // The message content
  createdAt: Date; // Timestamp when the message was created
}

const ContactMessageSchema = new Schema<IContactMessage>({
  userId: { type: String, ref: "User" }, // Optional user reference
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const ContactMessage = model<IContactMessage>(
  "ContactMessage",
  ContactMessageSchema,
);
