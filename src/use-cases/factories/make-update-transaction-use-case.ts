import { PrismaTransactionRepository } from "@/repositories/prisma/prisma-transaction-repository";
import { UpdateTransactionUseCase } from "../update-transaction";

export function makeUpdateTransactionUseCase() {
  const transactionsRepository = new PrismaTransactionRepository();
  const updateTransactionUseCase = new UpdateTransactionUseCase(
    transactionsRepository
  );

  return updateTransactionUseCase;
}
