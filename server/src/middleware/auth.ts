import { clerkMiddleware, getAuth, requireAuth } from "@clerk/express";
import { getFrontendUrl, getLoginUrl } from "../lib/config.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load the root .env file
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

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
