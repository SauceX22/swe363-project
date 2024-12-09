import mongoose from "mongoose";

// Define the schema for market items
const marketItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: "/assets/placeholder.png",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming a "User" model exists
    required: true,
  },
});

// Create and export the model
const MarketItem = mongoose.model("MarketItem", marketItemSchema);

export { MarketItem };
