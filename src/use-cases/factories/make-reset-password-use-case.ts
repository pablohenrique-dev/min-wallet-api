import { PrismaResetPasswordTokenRepository } from "@/repositories/prisma/prisma-reset-password-token-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { ResetPasswordUseCase } from "../reset-password";

export function makeResetPasswordUseCase() {
  const resetPasswordTokenRepository = new PrismaResetPasswordTokenRepository();
  const userRepository = new PrismaUserRepository();
  const resetPasswordUseCase = new ResetPasswordUseCase(
    resetPasswordTokenRepository,
    userRepository
  );

  return resetPasswordUseCase;
}
