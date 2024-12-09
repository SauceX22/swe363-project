import express from "express";
import { ChatRoom } from "../../models/ChatRoom.js";
import { ChatMessage } from "../../models/ChatMessage.js";
import {
  clerkAuthenticationMiddleware,
  requireAuthentication,
} from "../../middleware/auth.js";
import { getAuth } from "@clerk/express";

const router = express.Router();

// Clerk authentication middleware, this adds the Clerk session to the request object
router.use(clerkAuthenticationMiddleware());

// Get chat rooms for the user
router.get("/rooms", requireAuthentication(), async (req, res) => {
  try {
    // Get the `userId` from the `Auth` object
    const { userId } = getAuth(req);
    const rooms = await ChatRoom.find({ participants: userId });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Send a message
router.post(
  "/rooms/:roomId/messages",
  requireAuthentication(),
  async (req, res) => {
    try {
      // Get the `userId` from the `Auth` object
      const { userId } = getAuth(req);
      const { content } = req.body;
      const roomId = req.params.roomId;

      const message = new ChatMessage({
        chatRoom: roomId,
        sender: userId,
        content,
      });
      await message.save();

      await ChatRoom.findByIdAndUpdate(roomId, { lastMessage: message._id });
      res.status(201).json(message);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// Get messages in a chat room
router.get(
  "/rooms/:roomId/messages",
  requireAuthentication(),
  async (req, res) => {
    try {
      const roomId = req.params.roomId;
      const messages = await ChatMessage.find({ chatRoom: roomId });
      res.json(messages);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

export default router;
