import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount";
import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";
import { Request, Response } from "express";
import z from "zod";

export async function getUserProfileController(req: Request, res: Response) {
  const userTokenParamSchema = z.object({
    id: z.string(),
  });

  const { id } = userTokenParamSchema.parse(req.user);

  try {
    const getUserProfileUseCase = makeGetUserProfileUseCase();

    const { user } = await getUserProfileUseCase.execute({
      user_id: id,
    });

    return res.json({
      ...user,
      password_hashed: undefined,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(409).json({
        error: error.message,
      });
    }
  }
}
