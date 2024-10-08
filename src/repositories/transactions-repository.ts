import { Transaction } from "./model/transtaction";

export interface CreateTransactionParams {
  title: string;
  description: string;
  value: number;
  user_id: string;
  date: Date;
  type: "INCOME" | "EXPENSE";
}

export interface FindManyTransactionsParams {
  user_id: string;
  title?: string;
  page: number;
  from?: string;
  to?: string;
  order?: "desc" | "asc";
  itemsPerPage: number;
}

export interface FindManyByPeriodTransactionsParams {
  user_id: string;
  from?: string;
  to?: string;
  title?: string;
}

export interface FindByIdTransactionParams {
  user_id: string;
  id: string;
}

export interface DeleteByIdTransactionParams
  extends FindByIdTransactionParams {}

export interface UpdateByIdTransactionParams extends CreateTransactionParams {
  id: string;
}

export interface TransactionsRepository {
  create: ({
    title,
    description,
    value,
    user_id,
    date,
    type,
  }: CreateTransactionParams) => Promise<Transaction>;

  findMany: ({
    user_id,
    title,
    page,
    from,
    to,
    order,
    itemsPerPage,
  }: FindManyTransactionsParams) => Promise<{
    count: number;
    transactions: Transaction[];
  }>;

  findManyByPeriod: ({
    user_id,
    from,
    to,
    title
  }: FindManyByPeriodTransactionsParams) => Promise<{
    transactions: Transaction[];
  }>;

  findById: ({
    user_id,
    id,
  }: FindByIdTransactionParams) => Promise<Transaction | null>;

  deleteById: ({ user_id, id }: DeleteByIdTransactionParams) => Promise<string>;

  updateById: ({
    user_id,
    id,
    title,
    description,
    value,
    date,
    type,
  }: UpdateByIdTransactionParams) => Promise<Transaction>;
}
