import { InMemoryTransactionsRepository } from "@/repositories/in-memory/in-memory-transactions-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetAllTransactionUseCase } from "./get-transactions";

describe("Get all transactions useCase", () => {
  let transactionsRepository: InMemoryTransactionsRepository;
  let sut: GetAllTransactionUseCase;

  beforeEach(async () => {
    transactionsRepository = new InMemoryTransactionsRepository();
    sut = new GetAllTransactionUseCase(transactionsRepository);
  });

  it("Should be able to get paginated user transactions", async () => {
    for (let i = 0; i < 31; i++) {
      await transactionsRepository.create({
        title: `Title ${i}`,
        value: 1 + i,
        user_id: "user-01",
        description: "",
      });
    }
    const { transactions } = await sut.execute({
      user_id: "user-01",
    });

    expect(transactions).toHaveLength(30);
  });
});
