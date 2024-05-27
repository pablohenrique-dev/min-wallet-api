import { Transaction } from "@/repositories/model/transtaction";
import { TransactionsRepository } from "@/repositories/transactions-repository";

interface GetAllTransactionsUseCaseParams {
  user_id: string;
  title?: string;
  page?: number;
  from?: string;
  to?: string;
  order?: "asc" | "desc";
}

interface GetAllTransactionsUseCaseResponse {
  transactions: Transaction[];
}

export class GetTransactionsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    user_id,
    title,
    page,
    from,
    to,
    order,
  }: GetAllTransactionsUseCaseParams): Promise<GetAllTransactionsUseCaseResponse> {
    const transactions = await this.transactionsRepository.findMany({
      user_id,
      title: title ?? "",
      page: page ?? 1,
      from,
      to,
      order,
    });

    return { transactions };
  }
}
