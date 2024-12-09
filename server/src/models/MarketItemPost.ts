import { Schema, model, Document, Types } from "mongoose";

const MarketItemPostSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  tag: { type: String, required: true },
  price: { type: Number, required: true },
  postedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const MarketItemPost = model("MarketItemPost", MarketItemPostSchema);

export default MarketItemPost;
