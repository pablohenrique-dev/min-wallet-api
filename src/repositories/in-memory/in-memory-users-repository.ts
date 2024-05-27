import { randomUUID } from "node:crypto";
import { CreateUserParams, UsersRepository } from "@/repositories/users-repository";
import { User } from "../model/user";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];
  async create({ email, password_hashed, name }: CreateUserParams) {
    const user: User = {
      id: randomUUID(),
      email,
      name,
      password_hashed,
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
}
