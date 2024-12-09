import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./lib/database.js";
import { requireAuthentication } from "./middleware/auth.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import userRouter from "./routers/api/userRouter.js";
import foundRouter from "./routers/api/foundRouter.js";
import marketRouter from "./routers/api/marketRouter.js";
import contactRouter from "./routers/api/contactRouter.js";
import chatRouter from "./routers/api/chatRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load the root .env file
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Connect to MongoDB
connectDB();

const app = express();

// Express configuration
app.set("port", process.env.SERVER_PORT || 5000);

app.use(cors());
app.use(express.json());

app.get("/protected", requireAuthentication(), (req, res) => {
  res.send("This is a protected route");
});
app.get("/test", (req, res) => {
  res.send(`This is a test route ${process.env.TEST}`);
});

app.get("/", (req, res) => {
  res.send("Sup bro");
});

app.use("/api/users", userRouter);
app.use("/api/found", foundRouter);
app.use("/api/market", marketRouter);
app.use("/api/contact", contactRouter);
app.use("/api/chat", chatRouter);

const port = app.get("port");
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
