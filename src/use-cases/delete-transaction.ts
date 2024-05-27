import { TransactionsRepository } from "@/repositories/transactions-repository";
import { ResourceNotFoundError } from "./errors/resource-not-fount";

interface DeleteTransactionUseCaseParams {
  user_id: string;
  id: string;
}

interface DeleteTransactionUseCaseResponse {
  id: string;
}

export class DeleteTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    user_id,
    id,
  }: DeleteTransactionUseCaseParams): Promise<DeleteTransactionUseCaseResponse> {
    const doesTransactionExist = await this.transactionsRepository.findById({
      user_id,
      id,
    });

    if (!doesTransactionExist) {
      throw new ResourceNotFoundError();
    }

    const transactionId = await this.transactionsRepository.deleteById({
      user_id,
      id,
    });

    return { id: transactionId };
  }
}
