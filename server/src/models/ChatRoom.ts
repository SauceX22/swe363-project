import { Schema, model, Document, Types } from "mongoose";

export interface IChatRoom extends Document {
  participants: Types.ObjectId[]; // Array of User references
  lastMessage?: Types.ObjectId; // Reference to the last message in the room
  createdAt: Date;
  updatedAt: Date;
}

const ChatRoomSchema = new Schema<IChatRoom>({
  participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const ChatRoom = model<IChatRoom>("ChatRoom", ChatRoomSchema);
