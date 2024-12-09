import express from "express";
import {
  clerkAuthenticationMiddleware,
  getAuthUser,
  requireAuthentication,
} from "../../middleware/auth.js";
import User from "../../models/User.js";

const router = express.Router();

// Clerk authentication middleware, this adds the Clerk session to the request object
router.use(clerkAuthenticationMiddleware());

// Get user profile
router.get("/me", requireAuthentication(), async (req, res) => {
  try {
    // Get the `userId` from the `Auth` object
    const userId = await getAuthUser(req, res);
    const user = await User.findOne({ id: userId });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update user profile
router.put("/me", requireAuthentication(), async (req, res) => {
  try {
    // Get the `userId` from the `Auth` object
    const userId = await getAuthUser(req, res);
    const updates = req.body;
    const user = await User.findOneAndUpdate({ id: userId }, updates, {
      new: true,
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
