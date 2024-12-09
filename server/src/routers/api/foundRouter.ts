import express from "express";
import { FoundItemPost } from "../../models/FoundItemPost.js"; // Assuming a Post model
import {
  clerkAuthenticationMiddleware,
  requireAuthentication,
} from "../../middleware/auth.js";
import { getAuth } from "@clerk/express";
import { z } from "zod";

const router = express.Router();

export interface FoundItemPost {
  id: string; // Unique identifier
  name: string; // Name of the found item
  description: string; // Detailed description of the item
  datePosted: Date;
  image: string | null;
  tag: string;
  location: string;
  reportedBy: string; // ID of the user who reported the item
}

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is too short" })
    .max(100, { message: "Name is too long" }),
  description: z
    .string()
    .min(1, { message: "Description is too short" })
    .max(1000, { message: "Description is too long" }),
  location: z
    .string()
    .min(1, { message: "Building name is too short" })
    .max(100, { message: "Building name is too long" }),
  tag: z
    .string()
    .min(1, { message: "Item Tag is too short" })
    .max(30, { message: "Item Tag is too long" }),
  image: z.string().optional(),
});

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
router.post("/new", async (req, res) => {
  try {
    // const { userId } = getAuth(req); // Clerk user ID
    const userId = "123";
    console.log(userId);
    const { name, description, tag, location, image } = req.body as Omit<
      FoundItemPost,
      "id" | "datePosted" | "reportedBy"
    >;

    // Validate input
    if (!name || !location || !tag || !description) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    // Create the post
    const post = new FoundItemPost({
      postedBy: userId,
      // Create the found item and link it to the post
      name: name,
      description: description,
      tag: tag,
      location: location,
      image: image,
      reportedBy: userId,
    });

    await post.save();

    res.status(201).json({ post });
  } catch (err) {
    console.log(err);
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

    // Delete the post
    await post.deleteOne();

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
