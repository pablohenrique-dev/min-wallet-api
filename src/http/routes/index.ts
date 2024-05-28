import { Router } from "express";
import { userRoutes } from "../controllers/users/routes";

export const routes = Router();

routes.use(userRoutes);
