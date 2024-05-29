import { makeGetTransactionUseCase } from "@/use-cases/factories/make-create-transaction-use-case";
import { Request, Response } from "express";
import z from "zod";

export async function createTransactionController(req: Request, res: Response) {
  const { id: user_id } = req.user;

  const createTransactionBodySchema = z.object({
    title: z.string().trim(),
    value: z.coerce.number().refine((value) => value !== 0, {
      message: "The value should be different from 0!",
    }),
    description: z.string().trim().default(""),
  });

  const { title, value, description } = createTransactionBodySchema.parse(
    req.body
  );

  const createTransactionUseCase = makeGetTransactionUseCase();

  const { transaction } = await createTransactionUseCase.execute({
    title,
    value,
    description,
    user_id,
  });

  return res.status(200).json({ transaction });
}
