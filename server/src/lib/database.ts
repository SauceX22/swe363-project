import { connect } from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not set in the .env file");
    process.exit(1);
  }
  try {
    await connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
    console.error(err);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
