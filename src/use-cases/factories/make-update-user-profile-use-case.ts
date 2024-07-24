import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { UpdateUserProfileUseCase } from "../update-user-profile";

export function makeUpdateUserProfileUseCase() {
  const usersRepository = new PrismaUserRepository();
  const updateUserProfileUseCase = new UpdateUserProfileUseCase(
    usersRepository
  );

  return updateUserProfileUseCase;
}
