import { Transaction } from "./model/transtaction";

export interface TransactionsRepository {
  create: ({
    title,
    description,
    value,
    user_id,
  }: {
    title: string;
    description: string;
    value: number;
    user_id: string;
  }) => Promise<Transaction>;

  findMany: ({
    user_id,
    title,
    page,
  }: {
    user_id: string;
    title: string;
    page: number;
  }) => Promise<Transaction[]>;

  findById: ({
    user_id,
    transaction_id,
  }: {
    user_id: string;
    transaction_id: string;
  }) => Promise<Transaction | null>;

  deleteById: ({
    user_id,
    transaction_id,
  }: {
    user_id: string;
    transaction_id: string;
  }) => Promise<string>;

  updateById: ({
    user_id,
    transaction_id,
    title,
    description,
    value,
  }: {
    user_id: string;
    transaction_id: string;
    title: string;
    description: string;
    value: number;
  }) => Promise<Transaction>;
}
