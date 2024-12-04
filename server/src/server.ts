import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./lib/database.js";

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.SERVER_PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Worldfasd!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
