import { Transaction } from "@/repositories/model/transtaction";
import { TransactionsRepository } from "@/repositories/transactions-repository";

interface CreateTransactionUseCaseParams {
  title: string;
  description: string;
  value: number;
  user_id: string;
  date: Date;
  type: "INCOME" | "EXPENSE";
}

interface CreateTransactionUseCaseResponse {
  transaction: Transaction;
}

export class CreateTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    title,
    description,
    user_id,
    value,
    date,
    type,
  }: CreateTransactionUseCaseParams): Promise<CreateTransactionUseCaseResponse> {
    const transaction = await this.transactionsRepository.create({
      title,
      description,
      user_id,
      value,
      date,
      type,
    });

    return { transaction };
  }
}
