import { PrismaResetPasswordTokenRepository } from "@/repositories/prisma/prisma-reset-password-token-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { ForgotPasswordUseCase } from "../forgot-password";

export function makeForgotPasswordUseCase() {
  const resetPasswordTokenRepository = new PrismaResetPasswordTokenRepository();
  const userRepository = new PrismaUserRepository();
  const forgotPasswordUseCase = new ForgotPasswordUseCase(
    resetPasswordTokenRepository,
    userRepository
  );

  return forgotPasswordUseCase;
}
