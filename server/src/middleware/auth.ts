import { clerkMiddleware, getAuth, requireAuth } from "@clerk/express";
import { getLoginUrl } from "../lib/config.js";
import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
import User from "../models/User.js";

// Load the root .env file
dotenv.config();

const isDevelopment = process.env.NODE_ENV === "development";

// Middleware to verify the token (user ID)
export function requireAuthentication() {
  console.log("authentication...");
  if (isDevelopment) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res
          .status(401)
          .json({ error: "Unauthorized: Missing or invalid token" });
        return;
      }

      const token = authHeader.split(" ")[1];

      try {
        // Check if the token matches a user ID in the database
        const user = await User.findById(token);
        if (!user) {
          console.log(`[AUTH] Invalid token: ${token}`);
          res.status(401).json({ error: "Unauthorized: Invalid token" });
          return;
        }

        console.log(`[AUTH] User authenticated: ${user._id}`);
        // @ts-ignore
        req.auth = { userId: user._id, email: user.email };
        next();
      } catch (error) {
        console.error(`[AUTH] Internal server error: ${error}`);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
    };
  }

  return requireAuth({
    signInUrl: process.env.CLERK_SIGN_IN_URL,
    signUpUrl: process.env.CLERK_SIGN_UP_URL,
  });
}

export async function getAuthUser(req: Request, res: Response) {
  if (isDevelopment) {
    const authHeader = req.headers.authorization;
    if (
      !authHeader ||
      !authHeader.startsWith("Bearer YOUR_AUTH_TOKEN_FROM_LOGIN_ROUTE") ||
      !authHeader.startsWith("Bearer ")
    ) {
      res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
      return;
    }

    const token = authHeader.split(" ")[1].toString() as string;

    // just get the user id from db
    try {
      // Check if the token matches a user ID in the database
      const user = await User.findById(token);
      if (!user) {
        console.log(`[AUTH] Invalid token: ${token}`);
        res.status(401).json({ error: "Unauthorized: Invalid token" });
        return;
      }

      return user.id;
    } catch (error) {
      console.error(`[AUTH] Internal server error: ${error}`);
      res.status(500).json({
        error:
          "Internal server error, please make sure you have the correct authentication token, if not please follow the instructions in the README.md file under the 'Authentication' section",
      });
      return;
    }
  }
  return getAuth(req).userId;
}

export function clerkAuthenticationMiddleware() {
  return clerkMiddleware({
    publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  });
}
