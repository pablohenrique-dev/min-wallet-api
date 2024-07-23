import { PrismaTransactionRepository } from "@/repositories/prisma/prisma-transaction-repository";
import { GetSummayUseCase } from "../get-summary";

export function makeGetSummaryUseCase() {
  const transactionRepository = new PrismaTransactionRepository();
  const getSummaryUseCase = new GetSummayUseCase(transactionRepository);

  return getSummaryUseCase;
}
