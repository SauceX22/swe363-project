import { Document, model, Schema } from "mongoose";

/**
 * Type to model the Post Schema for TypeScript.
 * @param user:ref => User._id
 * @param title:string
 * @param content:string
 * @param createdAt:Date
 */

export type TPost = {
  user: string;
  title: string;
  content: string;
  createdAt?: Date;
};

/**
 * Mongoose Document based on TPost for TypeScript.
 * TPost
 * @param user:ref => User._id
 * @param title:string
 * @param content:string
 * @param createdAt:Date
 */

export interface IPost extends TPost, Document {}

const postSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = model<IPost>("Post", postSchema);

export default Post;
