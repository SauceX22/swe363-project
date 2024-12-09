import { IUser } from "../../models/User.ts"; // Adjust the path based on your file structure
declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Add user to the Request type
    }
  }
}
