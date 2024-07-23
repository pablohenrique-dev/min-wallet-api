import { InMemoryTransactionsRepository } from "@/repositories/in-memory/in-memory-transactions-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetTransactionsUseCase } from "./get-transactions";

describe("Get all transactions useCase", () => {
  let transactionsRepository: InMemoryTransactionsRepository;
  let sut: GetTransactionsUseCase;

  beforeEach(async () => {
    transactionsRepository = new InMemoryTransactionsRepository();
    sut = new GetTransactionsUseCase(transactionsRepository);

    for (let i = 0; i < 31; i++) {
      await transactionsRepository.create({
        title: `Title ${i}`,
        value: 1 + i,
        user_id: "user-01",
        description: "",
        date: new Date(),
        type: "EXPENSE",
      });
    }
  });

  it("Should be able to get paginated user transactions", async () => {
    const { transactions } = await sut.execute({
      user_id: "user-01",
      page: 2,
    });

    expect(transactions).toHaveLength(1);
  });

  it("Should be able to get a transaction based on its title", async () => {
    const { transactions } = await sut.execute({
      user_id: "user-01",
      title: "Title 0",
    });

    expect(transactions).toHaveLength(1);
  });

  it("Should be able to sort transactions in descending order based on its value", async () => {
    const { transactions } = await sut.execute({
      user_id: "user-01",
      order: "desc",
    });

    expect(transactions[0].value).toBeGreaterThan(
      transactions[transactions.length - 1].value
    );
  });

  it("Should be able to sort transactions in ascending order", async () => {
    const { transactions } = await sut.execute({
      user_id: "user-01",
      order: "asc",
    });

    expect(transactions[0].value).toBeLessThan(
      transactions[transactions.length - 1].value
    );
  });
});
