import { authConfig } from "@/config/auth";
import { AppError } from "@/utils/app-error";
import { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";

export async function refreshController(req: Request, res: Response) {
  const { secret, expiresIn } = authConfig;

  const refreshTokenCookie: string | undefined = req.cookies["refreshToken"];

  if (!refreshTokenCookie) {
    throw new AppError("Unauthorized!", 401);
  }
  
  try {
    const { sub: user_id } = verify(refreshTokenCookie, authConfig.secret) as {
      sub: string;
    };

    const token = sign({}, secret, {
      subject: user_id,
      expiresIn: expiresIn["1h"],
    });

    const refreshToken = sign({}, secret, {
      subject: user_id,
      expiresIn: expiresIn["7d"],
    });
    
    return res
      .cookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: "strict",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .status(200)
      .json({
        token,
      });
  } catch (error) {
    throw new AppError("Invalid JWT!", 401);
  }
}
