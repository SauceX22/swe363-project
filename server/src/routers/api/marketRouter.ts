import express from "express";
import { MarketItem } from "../../models/MarketItem.js";  // Import the MarketItem model
import { requireAuthentication } from "../../middleware/auth.js"; // Import authentication middleware

const marketRouter = express.Router();

// Get all market items
marketRouter.get("/market", async (req, res) => {
  try {
    // Fetch all market items and populate the user details
    const marketItems = await MarketItem.find().populate("user", "name");
    res.json(marketItems);  // Return the items in JSON format
  } catch (error) {
    console.error("Error fetching market items:", error);
    res.status(500).json({ message: "Failed to fetch market items." });
  }
});

// Create a new market item
marketRouter.post("/market", requireAuthentication(), async (req, res) => {
  const { name, description, price, image } = req.body;
  const user = req.user;  // Assuming user info is added to the request by authentication middleware

  try {
    // Create a new market item using the request body and the authenticated user's ID
    const newItem = new MarketItem({
      name,
      description,
      price,
      image,
      user: user._id,
    });

    // Save the new item to the database
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);  // Return the saved item in the response
  } catch (error) {
    console.error("Error creating market item:", error);
    res.status(500).json({ message: "Failed to create market item." });
  }
});

export { marketRouter };
