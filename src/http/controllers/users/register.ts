import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";
import { makeRegisterUserUseCase } from "@/use-cases/factories/make-register-use-case";
import { Request, Response } from "express";
import z from "zod";

export async function registerUserController(req: Request, res: Response) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "The password must be at least 6 characters long!" }),
  });

  const { email, name, password } = registerBodySchema.parse(req.body);

  try {
    const registerUserUseCase = makeRegisterUserUseCase();

    await registerUserUseCase.execute({
      name,
      email,
      password,
    });

    return res.status(200).json();
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).json({
        error: error.message,
      });
    }
  }
}
