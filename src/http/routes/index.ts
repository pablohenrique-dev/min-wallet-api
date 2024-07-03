import { Router } from "express";
import { userRoutes } from "../controllers/users/routes";
import { transactionRoutes } from "../controllers/transactions/routes";
import { resetPasswordRoutes } from "../controllers/reset-password/routes";

export const routes = Router();

routes.use(userRoutes);
routes.use(transactionRoutes);
routes.use(resetPasswordRoutes);
