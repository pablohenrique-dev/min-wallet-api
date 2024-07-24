import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";
import { makeUpdateUserProfileUseCase } from "@/use-cases/factories/make-update-user-profile-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function updateUserProfileController(req: Request, res: Response) {
  const updateUserProfileBodySchema = z.object({
    name: z.string().trim(),
    email: z.string().trim().email(),
  });

  const { email, name } = updateUserProfileBodySchema.parse(req.body);

  try {
    const { id: userId } = req.user;

    const updateUserProfileUseCase = makeUpdateUserProfileUseCase();

    await updateUserProfileUseCase.execute({
      userId,
      email,
      name,
    });

    return res.status(200).json();
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({
        error: error.message,
      });
    }

    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).json({
        error: error.message,
      });
    }

    throw error;
  }
}
