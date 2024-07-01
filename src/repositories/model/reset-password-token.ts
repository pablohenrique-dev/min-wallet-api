export interface ResetPasswordToken {
  id: string;
  user_id: string;
  token_hashed: string;
  expiry_date: Date;
  created_at: Date;
  updated_at: Date;
}
