import { Schema, model, Document, Types } from "mongoose";

const FoundItemPostSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  name: { type: String, required: true },
  description: { type: String, required: true },
  tag: { type: String, required: true },
  dateFound: { type: Date, required: true },
  location: { type: String, required: true },
  postedBy: { type: String, required: true },
});

const FoundItemPost = model("FoundItemPost", FoundItemPostSchema);

export default FoundItemPost;
