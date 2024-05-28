import { Router } from "express";
import { registerUserController } from "./register";
import { getUserProfileController } from "./profile";
import { authenticateController } from "./authenticate";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export const userRoutes = Router();

userRoutes.post("/register", registerUserController);
userRoutes.post("/sessions", authenticateController);

/* Private routes */
userRoutes.get("/me", verifyJwt, getUserProfileController);
