// Required imports
import express, { Request, Response } from "express";
import { z } from "zod";
import {
  clerkAuthenticationMiddleware,
  getAuthUser,
  requireAuthentication,
} from "../../middleware/auth.js";
import { validateRequest } from "../../middleware/validation.js";
import MarketItemPost from "../../models/MarketItemPost.js";

// MarketItemPost router
const marketItemPostRouter = express.Router();

// Clerk authentication middleware, this adds the Clerk session to the request object
marketItemPostRouter.use(clerkAuthenticationMiddleware());

// Zod schema for MarketItemPost validation
const marketItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  tag: z.string().min(1, "Tag is required"),
  price: z.number().min(0, "Price must be a positive number"),
  postedBy: z.string().min(1, "Posted by is required"),
  createdAt: z.string().transform((val) => new Date(val)),
});

// Get all market items
marketItemPostRouter.get("/", async (req: Request, res: Response) => {
  try {
    const marketItems = await MarketItemPost.find();
    res.status(200).json(marketItems);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific market item by ID
marketItemPostRouter.get(
  "/:id",
  requireAuthentication(),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const marketItem = await MarketItemPost.findById(id);
      if (!marketItem) {
        res.status(404).json({ error: "Market item not market" });
        return;
      }
      res.status(200).json(marketItem);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

// Create a new market item
marketItemPostRouter.post(
  "/",
  requireAuthentication(),
  validateRequest(marketItemSchema),
  async (req: Request, res: Response) => {
    try {
      const { name, description, tag, dateMarket, location } = req.body;
      const postedBy = await getAuthUser(req, res);

      const newMarketItem = new MarketItemPost({
        name,
        description,
        tag,
        dateMarket,
        location,
        postedBy,
      });
      await newMarketItem.save();
      res.status(201).json(newMarketItem);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

// Update an existing market item
marketItemPostRouter.put(
  "/:id",
  requireAuthentication(),
  validateRequest(marketItemSchema),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, description, tag, dateMarket, location } = req.body;
      const updatedMarketItem = await MarketItemPost.findByIdAndUpdate(
        id,
        { name, description, tag, dateMarket, location },
        { new: true, runValidators: true },
      );
      if (!updatedMarketItem) {
        res.status(404).json({ error: "Market item not market" });
        return;
      }
      res.status(200).json(updatedMarketItem);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

// Delete a market item
marketItemPostRouter.delete(
  "/:id",
  requireAuthentication(),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedMarketItem = await MarketItemPost.findByIdAndDelete(id);
      if (!deletedMarketItem) {
        res.status(404).json({ error: "Market item not market" });
        return;
      }
      res.status(200).json({ message: "Market item deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

export default marketItemPostRouter;
