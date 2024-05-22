import { randomUUID } from "crypto";
import { Transaction } from "../model/transtaction";
import { TransactionsRepository } from "../transactions-repository";

export class InMemorytransactionsRepository implements TransactionsRepository {
  public items: Transaction[] = [];

  async create({
    title,
    description,
    value,
    user_id,
  }: {
    title: string;
    description?: string;
    value: number;
    user_id: string;
  }) {
    const transaction: Transaction = {
      id: randomUUID(),
      title,
      description,
      value,
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.items.push(transaction);

    return transaction;
  }

  async findManyByUserId({ user_id, page }: { user_id: string; page: number }) {
    const itemsPerPage = 30;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const transactions = this.items
      .filter((transaction) => transaction.user_id === user_id)
      .slice(startIndex, endIndex);

    return transactions;
  }

  async findById({
    user_id,
    transaction_id,
  }: {
    user_id: string;
    transaction_id: string;
  }) {
    const transaction = this.items.find(
      (transaction) =>
        transaction.user_id === user_id && transaction.id === transaction_id
    );

    if (!transaction) return null;

    return transaction;
  }

  async deleteById({
    user_id,
    transaction_id,
  }: {
    user_id: string;
    transaction_id: string;
  }) {
    this.items.filter(
      (transaction) =>
        transaction.user_id === user_id && transaction.id !== transaction_id
    );

    return transaction_id;
  }
}
