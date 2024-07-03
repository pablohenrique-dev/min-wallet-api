import { prisma } from "@/lib/prisma";
import {
  CreateResetPasswordTokenParams,
  ResetPasswordTokenRepository,
} from "../reset-password-token-repository";

export class PrismaResetPasswordTokenRepository
  implements ResetPasswordTokenRepository
{
  async create({
    user_id,
    token,
    expiry_date,
  }: CreateResetPasswordTokenParams) {
    const resetPasswordToken = await prisma.resetPasswordToken.create({
      data: {
        expiry_date,
        user_id,
        token_hashed: token,
      },
    });

    return resetPasswordToken;
  }
  async findByUserId(user_id: string) {
    const resetPasswordToken = await prisma.resetPasswordToken.findUnique({
      where: {
        user_id,
      },
    });

    return resetPasswordToken;
  }
  async deleteById(id: string) {
    const resetPasswordToken = await prisma.resetPasswordToken.delete({
      where: {
        id,
      },
    });

    return resetPasswordToken.id;
  }
}
