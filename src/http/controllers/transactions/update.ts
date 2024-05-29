import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount";
import { makeUpdateTransactionUseCase } from "@/use-cases/factories/make-update-transaction-use-case";
import { Request, Response } from "express";
import z from "zod";

export async function updateTransactionController(req: Request, res: Response) {
  const { id: user_id } = req.user;

  const transactionIdParamSchema = z.object({
    id: z.string(),
  });

  const updateTransactionBodySchema = z.object({
    title: z.string().trim(),
    value: z.coerce.number().refine((value) => value !== 0, {
      message: "The value should be different from 0!",
    }),
    description: z.string().trim().default(""),
  });

  const { id } = transactionIdParamSchema.parse(req.params);

  const { value, title, description } = updateTransactionBodySchema.parse(
    req.body
  );

  try {
    const updateTransactionUseCase = makeUpdateTransactionUseCase();

    const { transaction } = await updateTransactionUseCase.execute({
      id,
      title,
      description,
      value,
      user_id,
    });

    return res.status(200).json(transaction);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({
        error: error.message,
      });
    }
  }
}
