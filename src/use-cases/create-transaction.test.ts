import { InMemoryTransactionsRepository } from "@/repositories/in-memory/in-memory-transactions-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateTransactionUseCase } from "./create-transaction";

describe("Create Transactions useCase", () => {
  let transactionsRepository: InMemoryTransactionsRepository;
  let sut: CreateTransactionUseCase;

  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository();
    sut = new CreateTransactionUseCase(transactionsRepository);
  });

  it("Should be able to create a new transaction", async () => {
    const { transaction } = await sut.execute({
      title: "NodeJs Course",
      description: "Just a simple description",
      value: 24.9,
      user_id: "user-01",
    });

    expect(transaction.id).toBeTypeOf("string");
    expect(transaction).toEqual(
      expect.objectContaining({
        title: "NodeJs Course",
        description: "Just a simple description",
        value: 24.9,
        user_id: "user-01",
      })
    );
  });
});
