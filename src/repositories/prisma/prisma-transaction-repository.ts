import {
  CreateTransactionParams,
  DeleteByIdTransactionParams,
  FindByIdTransactionParams,
  FindManyTransactionsParams,
  TransactionsRepository,
  UpdateByIdTransactionParams,
} from "../transactions-repository";
import { prisma } from "@/lib/prisma";

export class PrismaTransactionRepository implements TransactionsRepository {
  async create(data: CreateTransactionParams) {
    const transaction = await prisma.transaction.create({
      data,
    });

    return transaction;
  }

  async updateById(data: UpdateByIdTransactionParams) {
    const transaction = await prisma.transaction.update({
      where: {
        id: data.id,
        user_id: data.user_id,
      },
      data,
    });

    return transaction;
  }

  async findMany({
    user_id,
    title,
    page,
    from,
    to,
    order,
    itemsPerPage,
  }: FindManyTransactionsParams) {
    const transactions = await prisma.transaction.findMany({
      where: {
        user_id,
        title: {
          contains: title,
          mode: "insensitive",
        },
        created_at: {
          lte: to ? new Date(to) : undefined,
          gte: from ? new Date(from) : undefined,
        },
      },
      orderBy: {
        value: order,
      },
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
    });

    const count = await prisma.transaction.count({
      where: {
        user_id,
        title: {
          contains: title,
          mode: "insensitive",
        },
        created_at: {
          lte: to ? new Date(to) : undefined,
          gte: from ? new Date(from) : undefined,
        },
      },
    });

    return {
      count,
      transactions,
    };
  }

  async findById({ user_id, id }: FindByIdTransactionParams) {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
        user_id,
      },
    });

    return transaction;
  }

  async deleteById({ user_id, id }: DeleteByIdTransactionParams) {
    const { id: transaction_id } = await prisma.transaction.delete({
      where: {
        user_id,
        id,
      },
    });

    return transaction_id;
  }
}
