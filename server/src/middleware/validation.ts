// Required imports
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

// Middleware to handle validation
export const validateRequest = (schema: z.ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({ error });
    }
  };
};
