import { Schema, model, Document } from "mongoose";

export interface IReport extends Document {
  reporter: Schema.Types.ObjectId;
  item: Schema.Types.ObjectId;
  message: string;
  createdAt?: Date;
}

const reportSchema = new Schema({
  reporter: { type: Schema.Types.ObjectId, ref: "User", required: true },
  item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Report = model<IReport>("Report", reportSchema);
