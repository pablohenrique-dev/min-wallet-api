import { randomUUID } from "crypto";
import { Transaction } from "../model/transtaction";
import { TransactionsRepository } from "../transactions-repository";

export class InMemoryTransactionsRepository implements TransactionsRepository {
  public items: Transaction[] = [];

  async create({
    title,
    description,
    value,
    user_id,
  }: {
    title: string;
    description: string;
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

  async findMany({
    user_id,
    title,
    page,
    from,
    to,
    order,
  }: {
    user_id: string;
    title: string;
    page: number;
    from: string | null;
    to: string | null;
    order: "desc" | "asc" | null;
  }) {
    const itemsPerPage = 30;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const fromDate = from ? new Date(from) : null;
    const toDate = to ? new Date(to) : null;

    let transactions = this.items
      .filter((transaction) => {
        const transactionDate = new Date(transaction.created_at);

        return (
          transaction.user_id === user_id &&
          transaction.title
            .toLocaleLowerCase()
            .includes(title.toLocaleLowerCase()) &&
          (!fromDate || transactionDate >= fromDate) &&
          (!toDate || transactionDate <= toDate)
        );
      })
      .slice(startIndex, endIndex);

    if (order) {
      transactions.sort((a, b) => {
        if (order === "asc") {
          return a.value - b.value;
        } else if (order === "desc") {
          return b.value - a.value;
        }
        return 0;
      });
    }

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

  async updateById({
    user_id,
    transaction_id,
    title,
    value,
    description,
  }: {
    user_id: string;
    transaction_id: string;
    title: string;
    description: string;
    value: number;
  }) {
    const transactionIndex = this.items.findIndex(
      (transaction) =>
        transaction.id === transaction_id && transaction.user_id === user_id
    );

    if (transactionIndex !== -1) {
      this.items[transactionIndex] = {
        ...this.items[transactionIndex],
        title,
        description: description ?? null,
        value,
        updated_at: new Date(),
      };
    }

    return this.items[transactionIndex];
  }
}
