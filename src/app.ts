import "express-async-errors";
import express from "express";
import { routes } from "./http/routes";
import { handleError } from "./http/middlewares/handle-error";

export const app = express();

app.use(express.json());
app.use(routes);

app.use(handleError);
