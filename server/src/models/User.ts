import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string; // Clerk's unique ID
  name: string;
  email: string;
  avatarUrl?: string;
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String },
});

export const User = model<IUser>("User", UserSchema);
