import { InMemorytransactionsRepository } from "@/repositories/in-memory/in-memory-transactions-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateTransactionUseCase } from "./create-transaction";
import { rejects } from "assert";

describe("Create Transactions useCase", () => {
  let transactionsRepository: InMemorytransactionsRepository;
  let sut: CreateTransactionUseCase;

  beforeEach(() => {
    transactionsRepository = new InMemorytransactionsRepository();
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
