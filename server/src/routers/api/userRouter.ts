import express, { Request, Response } from "express";
import { User } from "../../models/User.js"; // Assuming you have a User model

const userRouter = express.Router(); // Make sure this is correctly initialized

// Register a new user
userRouter.post("/register", async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    res.status(400).json({ message: "Name, email, and password are required." });
    return; // Early return to ensure void is returned.
  }

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already in use." });
      return; // Early return to ensure void is returned.
    }

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password, // Ensure that password is properly hashed before saving
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with the saved user
    res.status(201).json({
      message: "User registered successfully.",
      user: savedUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Failed to register user." });
  }
});

export { userRouter };
