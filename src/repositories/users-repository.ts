import { User } from "./model/user";

export interface CreateUserParams {
  email: string;
  password: string;
  name: string;
}

export interface UpdateUserPasswordParams {
  userId: string;
  password: string;
}

export interface UpdateUserProfileParams {
  userId: string;
  email: string;
  name: string;
}

export interface UsersRepository {
  create: ({ email, password, name }: CreateUserParams) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
  findById: (id: string) => Promise<User | null>;
  updatePassword: ({userId, password}: UpdateUserPasswordParams) => Promise<User>;
  updateProfile: ({email, name, userId}:UpdateUserProfileParams) => Promise<User>;
}
