import { Schema, model, Document, Types } from "mongoose";

export interface IMarketItem extends Document {
  title: string;
  description: string;
  category: string;
  price: number;
  seller: Types.ObjectId; // Reference to User
}

const MarketItemSchema = new Schema<IMarketItem>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const MarketItem = model<IMarketItem>("MarketItem", MarketItemSchema);
