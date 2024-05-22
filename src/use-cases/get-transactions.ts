import { Transaction } from "@/repositories/model/transtaction";
import { TransactionsRepository } from "@/repositories/transactions-repository";

interface GetAllTransactionsUseCaseParams {
  user_id: string;
  page?: number;
}

interface GetAllTransactionsUseCaseResponse {
  transactions: Transaction[];
  transactions_amount: number;
}

export class GetAllTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    user_id,
    page,
  }: GetAllTransactionsUseCaseParams): Promise<GetAllTransactionsUseCaseResponse> {
    const transactions = await this.transactionsRepository.findManyByUserId({
      user_id,
      page: page ?? 1,
    });

    return { transactions, transactions_amount: transactions.length };
  }
}
