import { makeGetTransactionsUseCase } from "@/use-cases/factories/make-get-transactions-use-case";
import { Request, Response } from "express";
import z from "zod";

export async function getTransactionsController(req: Request, res: Response) {
  const { id: user_id } = req.user;

  const searchParamsTransactionSchema = z.object({
    page: z.coerce
      .number()
      .transform((value) => (value <= 0 ? 1 : value))
      .optional(),
    title: z.string().optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    order: z.enum(["asc", "desc"]).optional(),
  });

  const { title, page, from, to, order } = searchParamsTransactionSchema.parse(
    req.query
  );

  const getTransactionsUseCase = makeGetTransactionsUseCase();

  const { count, pages, next_page, previous_page, transactions } =
    await getTransactionsUseCase.execute({
      title,
      page,
      from,
      to,
      order,
      user_id,
    });

  return res.status(200).json({ count, pages, next_page, previous_page, transactions });
}
