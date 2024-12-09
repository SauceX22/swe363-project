import { clerkMiddleware, requireAuth } from "@clerk/express";
import { getLoginUrl } from "../lib/config.js";
import dotenv from "dotenv";

// Load the root .env file
dotenv.config();

/**
 *  Middleware to check if the user is authenticated
 */
export function requireAuthentication() {
  return requireAuth({
    signInUrl: getLoginUrl(),
    signUpUrl: getLoginUrl(),
  });
}

export function clerkAuthenticationMiddleware() {
  return clerkMiddleware({
    publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  });
}
