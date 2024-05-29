import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount";
import { makeDeleteTransactionUseCase } from "@/use-cases/factories/make-delete-transaction-use-case";
import { Request, Response } from "express";
import z from "zod";

export async function deleteTransactionController(req: Request, res: Response) {
  const { id: user_id } = req.user;

  const transactionIdParamSchema = z.object({
    id: z.string(),
  });

  const { id } = transactionIdParamSchema.parse(req.params);

  try {
    const deleteTransactionUseCase = makeDeleteTransactionUseCase();

    await deleteTransactionUseCase.execute({
      id,
      user_id,
    });

    return res.status(204).json();
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({
        error: error.message,
      });
    }
  }
}
