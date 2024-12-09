import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { requireAuthentication } from "./middleware/auth.js";

import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./lib/uploadthing.js";
import mongoose from "mongoose";

import foundRouter from "./routers/api/foundRouter.js";
import marketRouter from "./routers/api/marketRouter.js";
import userRouter from "./routers/api/userRouter.js";
import chatRouter from "./routers/api/chatRouter.js";
import contactRouter from "./routers/api/contactRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load the root .env file
dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://admin:password@localhost:27017/?authSource=admin";

console.log(process.env.MONGO_URI);

const app = express();

// Express configuration
app.set("port", process.env.SERVER_PORT || 5000);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/protected", requireAuthentication(), (req, res) => {
  res.send("This is a protected route");
});
app.get("/test", (req, res) => {
  res.send(`This is a test route ${process.env.TEST}`);
});

app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config: {
      isDev: process.env.NODE_ENV === "development",
      token: process.env.UPLOADTHING_TOKEN,
    },
  }),
);

app.get("/", (req, res) => {
  res.send("Sup bro");
});

app.use("/api/users", userRouter);
app.use("/api/found", foundRouter);
app.use("/api/market", marketRouter);
app.use("/api/contact", contactRouter);
app.use("/api/chat", chatRouter);

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    const db = mongoose.connection;

    db.on("error", (error) => {
      console.log(error);
    });

    db.once("connected", () => {
      console.log("Database Connected");
    });

    app.listen(SERVER_PORT, () => {
      console.log(`Server is running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
