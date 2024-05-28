import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { RegisterUseCase } from "../register";

export function makeRegisterUserUseCase() {
  const usersRepository = new PrismaUserRepository();
  const registerUserUseCase = new RegisterUseCase(usersRepository);

  return registerUserUseCase;
}
