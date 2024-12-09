import express from "express";
import {Item} from "../../models/Item.js";
import {
    requireAuthentication,
  } from "../../middleware/auth.js";
const itemRouter = express.Router();

// Get all items
itemRouter.get("/items", async (req, res) => {
  try {
    const items = await Item.find().populate("user", "name");
    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Failed to fetch items." });
  }
});

// Create an item
itemRouter.post("/items", requireAuthentication(), async (req, res) => {
  const { name, description, category, location, foundDate } = req.body; 
  const user = req.user;

  try {
    const newItem = new Item({
      name,
      description,
      category,
      location,
      foundDate,
      user: user._id,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ message: "Failed to create item." });
  }
});

export { itemRouter };
