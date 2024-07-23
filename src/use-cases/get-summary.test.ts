import { beforeEach, describe, expect, it } from "vitest";
import { GetSummayUseCase } from "./get-summary";
import { InMemoryTransactionsRepository } from "@/repositories/in-memory/in-memory-transactions-repository";

describe("Get transactions summary useCase", () => {
  let transactionsRepository: InMemoryTransactionsRepository;
  let sut: GetSummayUseCase;

  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository();
    sut = new GetSummayUseCase(transactionsRepository);
  });

  it("Should be able to get transaction summary", async () => {
    await transactionsRepository.create({
      title: "First transaction",
      value: 25,
      user_id: "user-01",
      description: "",
      date: new Date(),
      type: "INCOME",
    });

    await transactionsRepository.create({
      title: "Second transaction",
      value: 100,
      user_id: "user-01",
      description: "",
      date: new Date(),
      type: "EXPENSE",
    });

    const { amount, balance, totalExpense, totalIncome } = await sut.execute({
      userId: "user-01",
    });

    expect(balance).toBe(-75);
    expect(amount).toBe(2);
    expect(totalExpense).toBe(100);
    expect(totalIncome).toBe(25);
  });
});
