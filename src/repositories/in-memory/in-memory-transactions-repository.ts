import { randomUUID } from "crypto";
import { Transaction } from "../model/transtaction";
import { CreateTransactionParams, DeleteByIdTransactionParams, FindByIdTransactionParams, FindManyTransactionsParams, TransactionsRepository, UpdateByIdTransactionParams } from "../transactions-repository";

export class InMemoryTransactionsRepository implements TransactionsRepository {
  public items: Transaction[] = [];

  async create({
    user_id,
    title,
    value,
    description,
  }: CreateTransactionParams) {
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
  }: FindManyTransactionsParams) {
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
    id,
  }: FindByIdTransactionParams) {
    const transaction = this.items.find(
      (transaction) =>
        transaction.user_id === user_id && transaction.id === id
    );

    if (!transaction) return null;

    return transaction;
  }

  async deleteById({ user_id, id }: DeleteByIdTransactionParams) {
    this.items.filter(
      (transaction) =>
        transaction.user_id === user_id && transaction.id !== id
    );

    return id!;
  }

  async updateById({
    user_id,
    id,
    title,
    value,
    description,
  }: UpdateByIdTransactionParams) {
    const transactionIndex = this.items.findIndex(
      (transaction) => transaction.id === id && transaction.user_id === user_id
    );

    if (transactionIndex !== -1) {
      this.items[transactionIndex] = {
        ...this.items[transactionIndex],
        title,
        description,
        value,
        updated_at: new Date(),
      };
    }

    return this.items[transactionIndex];
  }
}
