import express, { Request, Response } from "express";
import {
  clerkAuthenticationMiddleware,
  requireAuthentication,
} from "../../middleware/auth.js";
import { getAuth } from "@clerk/express";
import Post from "../../models/Post.js";

const postsRouter = express.Router();

// Clerk authentication middleware, this adds the Clerk session to the request object
postsRouter.use(clerkAuthenticationMiddleware());

/**
 * Endpoint to get all posts by the authenticated user.
 */
postsRouter.get("/posts", requireAuthentication(), async (req, res) => {
  // Get the `userId` from the `Auth` object
  const { userId } = getAuth(req);

  try {
    const posts = await Post.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});

/**
 * Endpoint to create a new post.
 */
postsRouter.post("/posts", requireAuthentication(), async (req, res) => {
  const { userId } = getAuth(req);
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400).json({ message: "Title and content are required" });
    return;
  }

  try {
    const newPost = new Post({
      user: userId,
      title,
      content,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Failed to create post" });
  }
});

/**
 * Endpoint to delete a post by ID (only if it belongs to the authenticated user).
 */
postsRouter.delete("/posts/:id", requireAuthentication(), async (req, res) => {
  const { id } = req.params;
  const { userId } = getAuth(req);
  try {
    const post = await Post.findOneAndDelete({ _id: id, user: userId });

    if (!post) {
      res.status(404).json({ message: "Post not found or unauthorized" });
      return;
    }

    res.json({ message: "Post deleted successfully", post });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Failed to delete post" });
  }
});

export { postsRouter };
