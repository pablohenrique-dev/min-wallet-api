import {
  CreateUserParams,
  UpdateUserPasswordParams,
  UpdateUserProfileParams,
  UsersRepository,
} from "../users-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUserRepository implements UsersRepository {
  async create({ email, name, password }: CreateUserParams) {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password_hashed: password,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async updatePassword({ userId, password }: UpdateUserPasswordParams) {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password_hashed: password,
      },
    });

    return user;
  }

  async updateProfile({ email, name, userId }: UpdateUserProfileParams) {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email,
        name,
      },
    });

    return user;
  }
}
