import { User } from "./model/user";

export interface CreateUserParams {
  email: string;
  password_hashed: string;
  name: string;
}

export interface UsersRepository {
  create: ({ email, password_hashed, name }: CreateUserParams) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
}
