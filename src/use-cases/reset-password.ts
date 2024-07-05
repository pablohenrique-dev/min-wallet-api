import { ResetPasswordTokenRepository } from "@/repositories/reset-password-token-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { InvalidOrExpiredPasswordResetTokenError } from "./errors/invalid-or-expired-password-reset-token";
import { compare, hash } from "bcryptjs";
import { isWithinOneHour } from "@/utils/is-within-one-hour";
import { User } from "@/repositories/model/user";
import { ResourceNotFoundError } from "./errors/resource-not-fount";

interface ResetPasswordUseCaseParams {
  token: string;
  email: string;
  password: string;
}

interface ResetPasswordUseCaseResponse {
  user: User;
}

export class ResetPasswordUseCase {
  constructor(
    private resetPasswordTokenRepository: ResetPasswordTokenRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    token,
    email,
    password,
  }: ResetPasswordUseCaseParams): Promise<ResetPasswordUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const passwordResetToken =
      await this.resetPasswordTokenRepository.findByUserId(user.id);

    if (!passwordResetToken) {
      throw new InvalidOrExpiredPasswordResetTokenError();
    }

    const doesPasswordResetTokenMatch = await compare(
      token,
      passwordResetToken.token_hashed
    );

    if (!doesPasswordResetTokenMatch) {
      throw new InvalidOrExpiredPasswordResetTokenError();
    }

    const isPasswordResetTokenStillValid = isWithinOneHour(
      passwordResetToken.expiry_date,
      new Date()
    );

    if (!isPasswordResetTokenStillValid) {
      throw new InvalidOrExpiredPasswordResetTokenError();
    }

    const newHashedPassword = await hash(password, 6);

    const userWithPasswordUpdated = await this.usersRepository.updatePassword({
      userId: user.id,
      password: newHashedPassword,
    });

    await this.resetPasswordTokenRepository.deleteById(passwordResetToken.id);

    return { user: userWithPasswordUpdated };
  }
}
