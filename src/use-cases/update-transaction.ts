import { Transaction } from "@/repositories/model/transtaction";
import { TransactionsRepository } from "@/repositories/transactions-repository";
import { ResourceNotFoundError } from "./errors/resource-not-fount";

interface UpdateTransactionUseCaseParams {
  user_id: string;
  transaction_id: string;
  title: string;
  description: string;
  value: number;
}

interface UpdateTransactionUseCaseResponse {
  transaction: Transaction;
}

export class UpdateTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    user_id,
    transaction_id,
    title,
    description,
    value,
  }: UpdateTransactionUseCaseParams): Promise<UpdateTransactionUseCaseResponse> {
    const doesTheTransactionExist = await this.transactionsRepository.findById({
      user_id,
      transaction_id,
    });

    if (!doesTheTransactionExist) {
      throw new ResourceNotFoundError();
    }

    const transaction = await this.transactionsRepository.updateById({
      user_id,
      transaction_id,
      title,
      description,
      value,
    });

    return { transaction };
  }
}
