import express, { Request, Response } from "express";
import { Report } from "../../models/Report.js";
import { requireAuthentication } from "../../middleware/auth.js";
const reportRouter = express.Router();

// Create a report
reportRouter.post("/reports", requireAuthentication(), async (req: Request, res: Response): Promise<void> => {
  const { itemId, message } = req.body;
  const reporter = req.user;

  if (!itemId || !message) {
    res.status(400).json({ message: "Item and message are required." });
    return; // Early return to ensure void is returned.
  }

  try {
    const newReport = new Report({
      reporter: reporter._id,
      item: itemId,
      message,
    });

    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ message: "Failed to create report." });
  }
});

export { reportRouter };
