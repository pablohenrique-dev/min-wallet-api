export interface User {
  id: string;
  name: string;
  email: string;
  password_hashed: string;
  created_at: Date;
  updated_at: Date;
}
