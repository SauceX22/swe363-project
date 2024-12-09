import { Schema, model, Document, Types } from "mongoose";

export interface IMarketItemPost extends Document {
  createdAt: Date;
  name: string;
  description: string;
  category: string;
  price: number;
  postedBy: Types.ObjectId; // Reference to User
}

const MarketItemPostSchema = new Schema<IMarketItemPost>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export const MarketItemPost = model<IMarketItemPost>(
  "MarketItemPost",
  MarketItemPostSchema,
);
