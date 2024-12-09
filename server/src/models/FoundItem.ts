import { Schema, model, Document, Types } from "mongoose";

export interface IFoundItem extends Document {
  title: string;
  description: string;
  category: string;
  dateFound: Date;
  location: string;
  reportedBy: Types.ObjectId; // Reference to User
}

const FoundItemSchema = new Schema<IFoundItem>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  dateFound: { type: Date, required: true },
  location: { type: String, required: true },
  reportedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const FoundItem = model<IFoundItem>("FoundItem", FoundItemSchema);
