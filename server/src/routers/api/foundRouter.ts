// Required imports
import express, { Request, Response } from "express";
import { z } from "zod";
import {
  clerkAuthenticationMiddleware,
  getAuthUser,
  requireAuthentication,
} from "../../middleware/auth.js";
import { validateRequest } from "../../middleware/validation.js";
import FoundItemPost from "../../models/FoundItemPost.js";

// FoundItemPost router
const foundItemPostRouter = express.Router();

// Clerk authentication middleware, this adds the Clerk session to the request object
foundItemPostRouter.use(clerkAuthenticationMiddleware());

// Zod schema for FoundItemPost validation
const foundItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  tag: z.string().min(1, "Tag is required"),
  dateFound: z.string().transform((val) => new Date(val)),
  location: z.string().min(1, "Location is required"),
});

// Get all found items
foundItemPostRouter.get("/", async (req: Request, res: Response) => {
  try {
    const foundItems = await FoundItemPost.find();
    res.status(200).json(foundItems);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific found item by ID
foundItemPostRouter.get(
  "/:id",
  requireAuthentication(),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const foundItem = await FoundItemPost.findById(id);
      if (!foundItem) {
        res.status(404).json({ error: "Found item not found" });
        return;
      }
      res.status(200).json(foundItem);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

// Create a new found item
foundItemPostRouter.post(
  "/",
  requireAuthentication(),
  validateRequest(foundItemSchema),
  async (req: Request, res: Response) => {
    try {
      const { name, description, tag, dateFound, location } = req.body;
      const postedBy = await getAuthUser(req, res);

      const newFoundItem = new FoundItemPost({
        name,
        description,
        tag,
        dateFound,
        location,
        postedBy,
      });
      await newFoundItem.save();
      res.status(201).json(newFoundItem);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

// Update an existing found item
foundItemPostRouter.put(
  "/:id",
  requireAuthentication(),
  validateRequest(foundItemSchema),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, description, tag, dateFound, location } = req.body;
      const updatedFoundItem = await FoundItemPost.findByIdAndUpdate(
        id,
        { name, description, tag, dateFound, location },
        { new: true, runValidators: true },
      );
      if (!updatedFoundItem) {
        res.status(404).json({ error: "Found item not found" });
        return;
      }
      res.status(200).json(updatedFoundItem);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

// Delete a found item
foundItemPostRouter.delete(
  "/:id",
  requireAuthentication(),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedFoundItem = await FoundItemPost.findByIdAndDelete(id);
      if (!deletedFoundItem) {
        res.status(404).json({ error: "Found item not found" });
        return;
      }
      res.status(200).json({ message: "Found item deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

export default foundItemPostRouter;
