import { AppError } from "@/utils/app-error";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function handleError(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.status).json({
      error: error.message,
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      error: error.errors.map((err) => ({
        field: err.path[0],
        message: err.message,
      })),
    });
  }

  return res.status(500).json({
    error: "Internal server error",
  });
}
