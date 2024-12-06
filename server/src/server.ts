import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./lib/database.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Express configuration
app.set("port", process.env.SERVER_PORT || 5000);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Sup bro");
});

const port = app.get("port");
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
