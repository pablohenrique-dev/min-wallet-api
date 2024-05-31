import { Transaction } from "@/repositories/model/transtaction";
import { TransactionsRepository } from "@/repositories/transactions-repository";
import { getPreviousAndNextPagination } from "@/utils/get-previous-and-next-pagination";

interface GetAllTransactionsUseCaseParams {
  user_id: string;
  title?: string;
  page?: number;
  from?: string;
  to?: string;
  order?: "asc" | "desc";
}

interface GetAllTransactionsUseCaseResponse {
  count: number;
  pages: number;
  next_page: number | null;
  previous_page: number | null;
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
    const itemsPerPage = 30;
    const currentPage = page ?? 1;

    const { count, transactions } = await this.transactionsRepository.findMany({
      user_id,
      title,
      page: currentPage,
      from,
      to,
      order,
      itemsPerPage,
    });

    const pages = Math.ceil(count / itemsPerPage);

    const { previousPage, nextPage } = getPreviousAndNextPagination({
      currentPage,
      totalPages: pages,
    });

    return {
      count,
      pages,
      next_page: nextPage,
      previous_page: previousPage,
      transactions,
    };
  }
}
