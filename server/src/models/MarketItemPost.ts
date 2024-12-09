import { Schema, model, Document, Types } from "mongoose";

export interface IMarketItemPost extends Document {
  item: Types.ObjectId; // Reference to MarketItem
  postedBy: Types.ObjectId; // Reference to User
  createdAt: Date;
}

const MarketItemPostSchema = new Schema<IMarketItemPost>({
  item: { type: Schema.Types.ObjectId, ref: "MarketItem", required: true },
  postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export const MarketItemPost = model<IMarketItemPost>(
  "MarketItemPost",
  MarketItemPostSchema,
);
