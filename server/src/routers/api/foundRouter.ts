import express from "express";
import { FoundItem } from "../../models/FoundItem.js";
import { FoundItemPost } from "../../models/FoundItemPost.js"; // Assuming a Post model
import {
  clerkAuthenticationMiddleware,
  requireAuthentication,
} from "../../middleware/auth.js";
import { getAuth } from "@clerk/express";

const router = express.Router();

// Clerk authentication middleware, this adds the Clerk session to the request object
router.use(clerkAuthenticationMiddleware());

// Get all posts with linked found items
router.get("/", async (req, res) => {
  try {
    // Populate the `item` field in posts
    const posts = await FoundItemPost.find().populate("item");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new post and link it to a found item
router.post("/", requireAuthentication(), async (req, res) => {
  try {
    const { userId } = getAuth(req); // Clerk user ID
    const { title, description, category, dateLost, location } = req.body;

    // Validate input
    if (!title || !description || !category || !dateLost || !location) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // Create the post
    const post = new FoundItemPost({
      author: userId,
    });

    // Create the found item and link it to the post
    const foundItem = new FoundItem({
      title,
      description,
      category,
      dateLost,
      location,
      reportedBy: userId,
      post: post._id, // Reference to the post
    });

    // Link the found item to the post
    post.set("item", foundItem._id);
    await post.save();

    res.status(201).json({ post, foundItem });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a single post with its linked found item by post ID
router.get("/:id", async (req, res) => {
  try {
    const post = await FoundItemPost.findById(req.params.id).populate("item");
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a post and its linked found item
router.delete("/:id", requireAuthentication(), async (req, res) => {
  try {
    const { userId } = getAuth(req);

    // Find the post by ID
    const post = await FoundItemPost.findById(req.params.id).populate("item");
    if (!post || post.postedBy.toString() !== userId) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    // Delete the linked found item
    if (post.item) {
      await FoundItem.findByIdAndDelete(post.item._id);
    }

    // Delete the post
    await post.deleteOne();

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
