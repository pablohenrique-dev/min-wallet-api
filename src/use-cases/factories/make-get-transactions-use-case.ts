import { PrismaTransactionRepository } from "@/repositories/prisma/prisma-transaction-repository";
import { GetTransactionsUseCase } from "../get-transactions";

export function makeGetTransactionsUseCase() {
  const transactionRepository = new PrismaTransactionRepository();
  const getTransactionsUseCase = new GetTransactionsUseCase(
    transactionRepository
  );

  return getTransactionsUseCase;
}
