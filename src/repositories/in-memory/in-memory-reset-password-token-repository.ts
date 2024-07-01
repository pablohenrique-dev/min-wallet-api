import { randomUUID } from "crypto";
import { ResetPasswordToken } from "../model/reset-password-token";
import {
  CreateResetPasswordTokenParams,
  ResetPasswordTokenRepository,
} from "../reset-password-token-repository";

export class InMemoryResetPasswordTokenRepository
  implements ResetPasswordTokenRepository
{
  public items: ResetPasswordToken[] = [];

  async create({
    user_id,
    token,
    expiry_date,
  }: CreateResetPasswordTokenParams) {
    const resetPasswordToken: ResetPasswordToken = {
      id: randomUUID(),
      token_hashed: token,
      user_id,
      expiry_date,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.items.push(resetPasswordToken);

    return resetPasswordToken;
  }

  async findByUserId(user_id: string) {
    const token = this.items.find((token) => token.user_id === user_id);

    if (!token) return null;

    return token;
  }

  async deleteById(id: string) {
    this.items.filter((token) => token.id !== id);

    return id;
  }
}
