import express from "express";
import { MarketItemPost } from "../../models/MarketItemPost.js"; // Assuming a Post model
import {
  clerkAuthenticationMiddleware,
  requireAuthentication,
} from "../../middleware/auth.js";
import { getAuth } from "@clerk/express";

const router = express.Router();

// Clerk authentication middleware, this adds the Clerk session to the request object
router.use(clerkAuthenticationMiddleware());

// Get all posts with linked market items
router.get("/", async (req, res) => {
  try {
    // Populate the `item` field in posts
    const posts = await MarketItemPost.find().populate("item");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new post and link it to a market item
router.post("/", requireAuthentication(), async (req, res) => {
  try {
    const { userId } = getAuth(req); // Clerk user ID
    const { title, description, category, price } = req.body;

    // Validate input
    if (!title || !description || !category || !price) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // Create the post
    const post = new MarketItemPost({
      author: userId,
      title,
      description,
      category,
      price,
      seller: userId,
    });

    await post.save();

    res.status(201).json({ post });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a single post with its linked market item by post ID
router.get("/:id", async (req, res) => {
  try {
    const post = await MarketItemPost.findById(req.params.id).populate("item");
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a post and its linked market item
router.delete("/:id", requireAuthentication(), async (req, res) => {
  try {
    const { userId } = getAuth(req);

    // Find the post by ID
    const post = await MarketItemPost.findById(req.params.id).populate("item");
    if (!post || post.postedBy.toString() !== userId) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    // Delete the post
    await post.deleteOne();

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
