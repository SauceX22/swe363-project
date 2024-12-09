import { Schema, model, Document, Types } from "mongoose";

export interface IChatMessage extends Document {
  chatRoom: Types.ObjectId; // Reference to the ChatRoom
  sender: Types.ObjectId; // Reference to the User who sent the Chatmessage
  content: string; // ChatMessage content
  createdAt: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>({
  chatRoom: { type: Schema.Types.ObjectId, ref: "ChatRoom", required: true },
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const ChatMessage = model<IChatMessage>(
  "ChatMessage",
  ChatMessageSchema,
);
