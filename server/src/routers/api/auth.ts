// Required imports
import { Router } from "express";
import User from "../../models/User.js";

const authRouter = Router();

// Login endpoint
/**
 * @route POST /auth/login
 * @desc Authenticate a user by email and return a token (user ID)
 */
authRouter.post("/login", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`[LOGIN] Email not found: ${email}`);
      res.status(404).json({
        message: `Email not found. Please register first at /auth/register. Use body: { email: ${email} }`,
      });
      return;
    }

    console.log(`[LOGIN] User authenticated: ${user._id}`);
    res.status(200).json({
      message:
        "Login successful, use the following token as Authorization header in your upcomping requests",
      token: `Bearer ${user._id}`,
    });
    return;
  } catch (error) {
    console.error(`[LOGIN] Internal server error: ${error}`);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});

// Register endpoint
/**
 * @route POST /auth/register
 * @desc Register a new user and return a success message
 */
authRouter.post("/register", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`[REGISTER] Email already registered: ${email}`);
      res.status(400).json({
        message: `Email is already registered. Login at /auth/login using body: { email: ${email} }`,
      });
      return;
    }

    // Create a new user
    const newUser = new User({ email });
    const savedUser = await newUser.save();

    console.log(`[REGISTER] User registered: ${savedUser._id}`);
    res.status(201).json({
      message: `User registered successfully. You can now log in at /auth/login using body: { email: ${email} }`,
    });
    return;
  } catch (error) {
    console.error(`[REGISTER] Internal server error: ${error}`);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});

export default authRouter;
