import { Router } from "express";
import { userRoutes } from "../controllers/users/routes";
import { transactionRoutes } from "../controllers/transactions/routes";
import { resetPasswordRoutes } from "../controllers/reset-password/routes";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../../../swagger.json";

export const routes = Router();

routes.use(userRoutes);
routes.use(transactionRoutes);
routes.use(resetPasswordRoutes);
routes.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, { explorer: true })
);
