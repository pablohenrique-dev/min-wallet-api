import { makeGetSummaryUseCase } from "@/use-cases/factories/make-get-summary-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function summaryTransactionController(
  req: Request,
  res: Response
) {
  const { id: userId } = req.user;

  const searchParamsTransactionSchema = z.object({
    from: z.string().optional(),
    to: z.string().optional(),
    title: z.string().optional(),
  });

  const { from, to, title } = searchParamsTransactionSchema.parse(req.query);

  const getSummaryUseCase = makeGetSummaryUseCase();

  const summary = await getSummaryUseCase.execute({ userId, from, to, title });

  return res.status(200).json(summary);
}
