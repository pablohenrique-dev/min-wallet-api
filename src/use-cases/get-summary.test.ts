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

  it("Should be able to get transaction summary based on title provided", async () => {
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
      title: "second",
    });

    expect(balance).toBe(-100);
    expect(amount).toBe(1);
    expect(totalExpense).toBe(100);
    expect(totalIncome).toBe(0);
  });

  it("Should be able to return a summary of 0 if the given period does not match the existing one", async () => {
    const date = new Date(2024, 6, 1);

    await transactionsRepository.create({
      title: "First transaction",
      value: 25,
      user_id: "user-01",
      description: "",
      date,
      type: "INCOME",
    });

    await transactionsRepository.create({
      title: "Second transaction",
      value: 100,
      user_id: "user-01",
      description: "",
      date,
      type: "EXPENSE",
    });

    const { amount, balance, totalExpense, totalIncome } = await sut.execute({
      userId: "user-01",
      from: "2024-01-01",
      to: "2024-01-31",
    });

    expect(balance).toBe(0);
    expect(amount).toBe(0);
    expect(totalExpense).toBe(0);
    expect(totalIncome).toBe(0);
  });
});
