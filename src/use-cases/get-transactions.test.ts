import { InMemoryTransactionsRepository } from "@/repositories/in-memory/in-memory-transactions-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetTransactionsUseCase } from "./get-transactions";

describe("Get all transactions useCase", () => {
  let transactionsRepository: InMemoryTransactionsRepository;
  let sut: GetTransactionsUseCase;

  beforeEach(async () => {
    transactionsRepository = new InMemoryTransactionsRepository();
    sut = new GetTransactionsUseCase(transactionsRepository);
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

  it("Should be able to get a transaction based on its title", async () => {
    for (let i = 0; i < 5; i++) {
      await transactionsRepository.create({
        title: `Title ${i}`,
        value: 1 + i,
        user_id: "user-01",
        description: "",
      });
    }

    const { transactions } = await sut.execute({
      user_id: "user-01",
      title: "Title 2",
    });

    expect(transactions).toEqual([
      expect.objectContaining({
        title: "Title 2",
      }),
    ]);
    expect(transactions).toHaveLength(1);
  });
});
