import { authConfig } from "@/config/auth";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import z from "zod";

export async function authenticateController(req: Request, res: Response) {
  const { secret, expiresIn } = authConfig;

  const credentialsBodySchema = z.object({
    email: z.string().email({ message: "Invalid e-mail format!" }),
    password: z.string().min(6, {
      message: "The password must be at least 6 characters long!",
    }),
  });

  const { email, password } = credentialsBodySchema.parse(req.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({ email, password });

    const token = sign({}, secret, { subject: user.id, expiresIn });

    return res.status(200).json({
      token,
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(400).json({
        error: error.message,
      });
    }

    throw error;
  }
}
