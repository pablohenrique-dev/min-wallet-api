import { Router } from "express";
import { userRoutes } from "../controllers/users/routes";
import { transactionRoutes } from "../controllers/transactions/routes";

export const routes = Router();

routes.use(userRoutes);
routes.use(transactionRoutes);
