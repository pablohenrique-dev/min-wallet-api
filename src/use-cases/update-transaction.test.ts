import { beforeEach, describe, expect, it } from "vitest";
import { UpdateTransactionUseCase } from "./update-transaction";
import { InMemoryTransactionsRepository } from "@/repositories/in-memory/in-memory-transactions-repository";
import { ResourceNotFoundError } from "./errors/resource-not-fount";

describe("Update transaction useCase", () => {
  let transactionsRepository: InMemoryTransactionsRepository;
  let sut: UpdateTransactionUseCase;

  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository();
    sut = new UpdateTransactionUseCase(transactionsRepository);
  });

  it("Should not be able to update a transaction if it doesn't exist", async () => {
    for (let i = 0; i < 5; i++) {
      await transactionsRepository.create({
        title: `Title ${i}`,
        description: "",
        value: 1 + i,
        user_id: "user-01",
        date: new Date(),
        type: "INCOME",
      });
    }

    await expect(() =>
      sut.execute({
        user_id: "user-01",
        id: "transaction-01",
        title: "NodeJs course",
        description: "",
        value: 24.9,
        date: new Date(),
        type: "EXPENSE",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("Should be able to update a transaction based on its id", async () => {
    const newTransaction = await transactionsRepository.create({
      title: "NodeJs Course",
      description: "Just a simple description",
      value: 24.9,
      user_id: "user-01",
      date: new Date(),
      type: "EXPENSE",
    });

    const { transaction } = await sut.execute({
      title: "NodeJs Course",
      description: "A course about node, ts and test",
      value: 24.9,
      user_id: newTransaction.user_id,
      id: newTransaction.id,
      date: new Date(),
      type: "EXPENSE",
    });

    expect(transaction.description).toBe("A course about node, ts and test");
  });
});
