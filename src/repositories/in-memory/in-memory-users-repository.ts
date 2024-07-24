import { randomUUID } from "node:crypto";
import {
  CreateUserParams,
  UpdateUserPasswordParams,
  UpdateUserProfileParams,
  UsersRepository,
} from "@/repositories/users-repository";
import { User } from "../model/user";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create({ email, password, name }: CreateUserParams) {
    const user: User = {
      id: randomUUID(),
      email,
      name,
      password_hashed: password,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.items.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }

  async findById(id: string) {
    const user = this.items.find((user) => user.id === id);

    if (!user) return null;

    return user;
  }

  async updatePassword({ userId, password }: UpdateUserPasswordParams) {
    const userIndex = this.items.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
      this.items[userIndex] = {
        ...this.items[userIndex],
        password_hashed: password,
      };
    }

    return this.items[userIndex];
  }

  async updateProfile({ email, name, userId }: UpdateUserProfileParams) {
    const userIndex = this.items.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
      this.items[userIndex] = {
        ...this.items[userIndex],
        email,
        name,
      };
    }

    return this.items[userIndex];
  }
}
