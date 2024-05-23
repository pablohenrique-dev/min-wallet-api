import { beforeEach, describe, expect, it } from "vitest";
import { DeleteTransactionUseCase } from "./delete-transaction";
import { InMemoryTransactionsRepository } from "@/repositories/in-memory/in-memory-transactions-repository";
import { ResourceNotFoundError } from "./errors/resource-not-fount";

describe("Delete transaction useCase", () => {
  let transactionsRepository: InMemoryTransactionsRepository;
  let sut: DeleteTransactionUseCase;

  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository();
    sut = new DeleteTransactionUseCase(transactionsRepository);
  });

  it("Should not be able to delete a transaction if id doesn't exist", async () => {
    for (let i = 0; i < 5; i++) {
      await transactionsRepository.create({
        title: `Title ${i}`,
        description: "",
        value: 1 + i,
        user_id: "user-01",
      });
    }

    await expect(() =>
      sut.execute({
        user_id: "user-01",
        transaction_id: "transaction-01",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("Should be able to delete a transaction based on its id", async () => {
    let transactionsAmount = 0;
    for (let i = 0; i < 5; i++) {
      await transactionsRepository.create({
        title: `Title ${i}`,
        description: "",
        value: 1 + i,
        user_id: "user-01",
      });
      transactionsAmount++;
    }

    const secondTransaction = await transactionsRepository.create({
      title: "Second transaction",
      description: "",
      value: 20,
      user_id: "user-01",
    });

    const { transaction_id } = await sut.execute({
      user_id: "user-01",
      transaction_id: secondTransaction.id,
    });

    expect(transaction_id).toBe(secondTransaction.id);
    expect(transactionsAmount).toBe(5);
  });
});
