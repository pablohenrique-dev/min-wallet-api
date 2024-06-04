import "express-async-errors";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { routes } from "./http/routes";
import { handleError } from "./http/middlewares/handle-error";

const CORS_ALLOWED_ORIGINS = [
  "http://localhost:5173",
]

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: CORS_ALLOWED_ORIGINS, 
    credentials: true, 
  })
);

app.use(routes);

app.use(handleError);
