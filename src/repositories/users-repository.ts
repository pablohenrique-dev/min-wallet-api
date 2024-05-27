import { User } from "./model/user";

export interface CreateUserParams {
  email: string;
  password: string;
  name: string;
}

export interface UsersRepository {
  create: ({ email, password, name }: CreateUserParams) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
  findById: (id: string) => Promise<User | null>;
}
