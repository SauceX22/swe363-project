import { randomUUID } from "crypto";
import { Schema, model, Document } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
});

const User = model("User", UserSchema);

export default User;
