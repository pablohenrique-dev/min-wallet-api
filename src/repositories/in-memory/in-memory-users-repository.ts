import { randomUUID } from "node:crypto";
import { UsersRepository } from "@/repositories/users-repository";
import { User } from "../model/user";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];
  async create({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) {
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
}
