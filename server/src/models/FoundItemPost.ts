import { Schema, model, Document, Types } from "mongoose";

export interface IFoundItemPost extends Document {
  createdAt: Date;
  name: string;
  description: string;
  category: string;
  dateFound: Date;
  location: string;
  postedBy: Types.ObjectId; // Reference to User
}

const FoundItemPostSchema = new Schema<IFoundItemPost>({
  createdAt: { type: Date, default: Date.now },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  dateFound: { type: Date, required: true },
  location: { type: String, required: true },
  postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const FoundItemPost = model<IFoundItemPost>(
  "FoundItemPost",
  FoundItemPostSchema,
);
