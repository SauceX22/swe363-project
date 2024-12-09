import { Schema, model, Document, Types } from "mongoose";

const ChatMessageSchema = new Schema({
  chatRoom: { type: String, ref: "ChatRoom", required: true },
  sender: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ChatMessage = model("ChatMessage", ChatMessageSchema);

export default ChatMessage;
