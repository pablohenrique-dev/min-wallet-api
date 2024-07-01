import { ResetPasswordToken } from "./model/reset-password-token";

export interface CreateResetPasswordTokenParams {
  user_id: string;
  token: string;
  expiry_date: Date;
}

export interface ResetPasswordTokenRepository {
  create: ({
    user_id,
    token,
    expiry_date,
  }: CreateResetPasswordTokenParams) => Promise<ResetPasswordToken>;

  findByUserId: (user_id: string) => Promise<ResetPasswordToken | null>;
  deleteById: (id: string) => Promise<string>;
}
