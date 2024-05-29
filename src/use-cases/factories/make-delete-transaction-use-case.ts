import { PrismaTransactionRepository } from "@/repositories/prisma/prisma-transaction-repository";
import { DeleteTransactionUseCase } from "../delete-transaction";

export function makeDeleteTransactionUseCase() {
  const transactionsRepository = new PrismaTransactionRepository();
  const deleteTransactionUseCase = new DeleteTransactionUseCase(
    transactionsRepository
  );

  return deleteTransactionUseCase;
}
