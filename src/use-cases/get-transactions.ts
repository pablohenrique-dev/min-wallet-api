import { Transaction } from "@/repositories/model/transtaction";
import { TransactionsRepository } from "@/repositories/transactions-repository";

interface GetAllTransactionsUseCaseParams {
  user_id: string;
  title?: string;
  page?: number;
}

interface GetAllTransactionsUseCaseResponse {
  transactions: Transaction[];
  transactions_amount: number;
}

export class GetTransactionsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    user_id,
    title,
    page,
  }: GetAllTransactionsUseCaseParams): Promise<GetAllTransactionsUseCaseResponse> {
    const transactions = await this.transactionsRepository.findMany({
      user_id,
      title: title ?? "",
      page: page ?? 1,
    });

    return { transactions, transactions_amount: transactions.length };
  }
}
