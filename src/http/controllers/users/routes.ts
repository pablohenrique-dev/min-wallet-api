import { Router } from "express";
import { registerUserController } from "./register";
import { getUserProfileController } from "./profile";
import { authenticateController } from "./authenticate";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { refreshController } from "./refresh";

export const userRoutes = Router();

userRoutes.post("/register", registerUserController);
userRoutes.post("/sessions", authenticateController);

userRoutes.patch("/token/refresh", refreshController);

/* Private routes */
userRoutes.get("/me", verifyJwt, getUserProfileController);
