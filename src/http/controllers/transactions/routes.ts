import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { Router } from "express";
import { createTransactionController } from "./create";
import { getTransactionsController } from "./get";
import { updateTransactionController } from "./update";
import { deleteTransactionController } from "./delete";

export const transactionRoutes = Router();

transactionRoutes.post("/transactions", verifyJwt, createTransactionController);
transactionRoutes.get("/transactions", verifyJwt, getTransactionsController);
transactionRoutes.put("/transactions/:id", verifyJwt, updateTransactionController);
transactionRoutes.delete("/transactions/:id", verifyJwt, deleteTransactionController);
