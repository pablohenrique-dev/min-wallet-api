import { Transaction } from "@/repositories/model/transtaction";
import { TransactionsRepository } from "@/repositories/transactions-repository";
import { ResourceNotFoundError } from "./errors/resource-not-fount";

interface UpdateTransactionUseCaseParams {
  user_id: string;
  id: string;
  title: string;
  description: string;
  value: number;
  date: Date;
  type: "INCOME" | "EXPENSE";
}

interface UpdateTransactionUseCaseResponse {
  transaction: Transaction;
}

export class UpdateTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    user_id,
    id,
    title,
    description,
    value,
    date,
    type,
  }: UpdateTransactionUseCaseParams): Promise<UpdateTransactionUseCaseResponse> {
    const doesTheTransactionExist = await this.transactionsRepository.findById({
      user_id,
      id,
    });

    if (!doesTheTransactionExist) {
      throw new ResourceNotFoundError();
    }

    const transaction = await this.transactionsRepository.updateById({
      user_id,
      id,
      title,
      description,
      value,
      date,
      type,
    });

    return { transaction };
  }
}
