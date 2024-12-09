import { Schema, model, Document } from "mongoose";

export interface IItem extends Document {
  name: string;
  description: string;
  category: string;
  user: Schema.Types.ObjectId;
  location: string;
  foundDate?: Date;
  createdAt?: Date;
}

const itemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  location: { type: String, required: true },
  foundDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const Item = model<IItem>("Item", itemSchema);
