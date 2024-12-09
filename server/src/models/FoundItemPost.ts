import { Schema, model, Document, Types } from "mongoose";

export interface IFoundItemPost extends Document {
  item: Types.ObjectId; // Reference to FoundItem
  postedBy: Types.ObjectId; // Reference to User
  createdAt: Date;
}

const FoundItemPostSchema = new Schema<IFoundItemPost>({
  item: { type: Schema.Types.ObjectId, ref: "FoundItem", required: true },
  postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export const FoundItemPost = model<IFoundItemPost>(
  "FoundItemPost",
  FoundItemPostSchema,
);
