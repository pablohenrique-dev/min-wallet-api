import { TransactionsRepository } from "@/repositories/transactions-repository";

interface GetSummayUseCaseParams {
  from?: string;
  to?: string;
  title?: string;
  userId: string;
}

export class GetSummayUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({ from, to, userId, title }: GetSummayUseCaseParams) {
    const { transactions } = await this.transactionsRepository.findManyByPeriod(
      {
        user_id: userId,
        from,
        to,
        title,
      }
    );

    const { totalIncome, totalExpense } = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "INCOME") {
          acc.totalIncome += transaction.value;
        } else if (transaction.type === "EXPENSE") {
          acc.totalExpense += transaction.value;
        }
        return acc;
      },
      { totalIncome: 0, totalExpense: 0 }
    );

    return {
      amount: transactions.length,
      totalIncome: Number(totalIncome.toFixed(2)),
      totalExpense: Number(totalExpense.toFixed(2)),
      balance: Number((totalIncome - totalExpense).toFixed(2)),
    };
  }
}
