import { TransactionsRepository } from "@/repositories/transactions-repository";
import { ResourceNotFoundError } from "./errors/resource-not-fount";

interface DeleteTransactionUseCaseParams {
  user_id: string;
  transaction_id: string;
}

interface DeleteTransactionUseCaseResponse {
  transaction_id: string;
}

export class DeleteTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    user_id,
    transaction_id,
  }: DeleteTransactionUseCaseParams): Promise<DeleteTransactionUseCaseResponse> {
    const doesTransactionExist = await this.transactionsRepository.findById({
      user_id,
      transaction_id,
    });

    if (!doesTransactionExist) {
      throw new ResourceNotFoundError();
    }

    const transactionId = await this.transactionsRepository.deleteById({
      user_id,
      transaction_id,
    });

    return { transaction_id: transactionId };
  }
}
