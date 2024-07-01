import { ResetPasswordTokenRepository } from "@/repositories/reset-password-token-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-fount";
import { randomBytes } from "crypto";
import { hash } from "bcryptjs";
import dayjs from "dayjs";

interface ForgotPasswordUseCaseParams {
  email: string;
}

interface ForgotPasswordUseCaseResponse {
  user_id: string;
  token: string;
}

export class ForgotPasswordUseCase {
  constructor(
    private resetPasswordTokenRepository: ResetPasswordTokenRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    email,
  }: ForgotPasswordUseCaseParams): Promise<ForgotPasswordUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const tokenAlreadyExists =
      await this.resetPasswordTokenRepository.findByUserId(user.id);

    if (tokenAlreadyExists)
      await this.resetPasswordTokenRepository.deleteById(tokenAlreadyExists.id);

    const resetPasswordToken = randomBytes(20).toString("hex");

    const resetTokenExpiry = dayjs().add(1, "hour").toDate();

    const tokenHashed = await hash(resetPasswordToken, 6);

    await this.resetPasswordTokenRepository.create({
      user_id: user.id,
      token: tokenHashed,
      expiry_date: resetTokenExpiry,
    });

    return {
      user_id: user.id,
      token: resetPasswordToken,
    };
  }
}
