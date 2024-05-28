import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@/utils/app-error";
import { authConfig } from "@/config/auth";

export async function verifyJwt(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError("Unauthorized!", 401);
  }

  const [, token] = authorization.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.secret) as {
      sub: string;
    };

    req.user = {
      id: user_id,
    };

    return next();
  } catch (error) {
    throw new AppError("Invalid JWT!", 401);
  }
}
