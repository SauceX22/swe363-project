import express from "express";
import {
  clerkAuthenticationMiddleware,
  requireAuthentication,
} from "../../middleware/auth.js";
import ContactMessage from "../../models/ContactMessage.js";

const router = express.Router();

// Clerk authentication middleware, this adds the Clerk session to the request object
router.use(clerkAuthenticationMiddleware());

// Submit a contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, message, userId } = req.body;
    const contactMessage = new ContactMessage({ name, email, message, userId });
    await contactMessage.save();
    res.status(201).json(contactMessage);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all contact messages (Admin only)
router.get("/", requireAuthentication(), async (req, res) => {
  // Add admin check logic here
  try {
    const messages = await ContactMessage.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
