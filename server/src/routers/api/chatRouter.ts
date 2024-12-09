// Required imports
import express, { Request, Response } from "express";
import { z } from "zod";
import { validateRequest } from "../../middleware/validation.js";
import ChatRoom from "../../models/ChatRoom.js";
import ChatMessage from "../../models/ChatMessage.js";
import { getAuthUser, requireAuthentication } from "../../middleware/auth.js";

const chatRouter = express.Router();

// Zod schemas for validation
const chatRoomSchema = z.object({
  participants: z.array(z.string()).min(1, "Participants are required"),
});

const chatMessageSchema = z.object({
  chatRoom: z.string().min(1, "ChatRoom ID is required"),
  sender: z.string().min(1, "Sender ID is required"),
  content: z.string().min(1, "Message content is required"),
});

// Create a new chat room
chatRouter.post(
  "/rooms",
  requireAuthentication(),
  validateRequest(chatRoomSchema),
  async (req: Request, res: Response) => {
    try {
      const { participants } = req.body;
      const newChatRoom = new ChatRoom({ participants });
      const savedChatRoom = await newChatRoom.save();
      res.status(201).json(savedChatRoom);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// Get all chat rooms for a user
chatRouter.get(
  "/rooms",
  requireAuthentication(),
  async (req: Request, res: Response) => {
    try {
      const userId = await getAuthUser(req, res);
      const chatRooms = await ChatRoom.find({ participants: userId });
      res.status(200).json(chatRooms);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// Send a message in a chat room
chatRouter.post(
  "/messages",
  requireAuthentication(),
  validateRequest(chatMessageSchema),
  async (req: Request, res: Response) => {
    try {
      const { chatRoom, sender, content } = req.body;

      // Ensure the chat room exists
      const room = await ChatRoom.findById(chatRoom);
      if (!room) {
        res.status(404).json({ error: "ChatRoom not found" });
        return;
      }

      // Create and save the message
      const newMessage = new ChatMessage({ chatRoom, sender, content });
      const savedMessage = await newMessage.save();

      // Update the lastMessage field in the chat room
      room.lastMessage = savedMessage.content;
      await room.save();

      res.status(201).json(savedMessage);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// Get all messages in a chat room
chatRouter.get(
  "/rooms/:roomId/messages",
  requireAuthentication(),
  async (req: Request, res: Response) => {
    try {
      const { roomId } = req.params;

      // Ensure the chat room exists
      const room = await ChatRoom.findById(roomId);
      if (!room) {
        res.status(404).json({ error: "ChatRoom not found" });
        return;
      }

      // Get all messages in the chat room
      const messages = await ChatMessage.find({ chatRoom: roomId });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

export default chatRouter;
