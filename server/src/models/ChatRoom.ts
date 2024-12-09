import { Schema, model, Document, Types } from "mongoose";

const ChatRoomSchema = new Schema({
  participants: [{ type: String, required: true }],
  lastMessage: { type: String, ref: "Message" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ChatRoom = model("ChatRoom", ChatRoomSchema);

export default ChatRoom;
