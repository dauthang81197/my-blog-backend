import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  console.error(error); // Log lỗi để debug
  return res.status(500).json({ message: "Internal server error" });
};
