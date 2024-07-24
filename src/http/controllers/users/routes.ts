import { Router } from "express";
import { registerUserController } from "./register";
import { getUserProfileController } from "./profile";
import { authenticateController } from "./authenticate";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { refreshController } from "./refresh";
import { updateUserProfileController } from "./update";

export const userRoutes = Router();

userRoutes.post("/register", registerUserController);
userRoutes.post("/sessions", authenticateController);

userRoutes.patch("/token/refresh", refreshController);

/* Private routes */
userRoutes.get("/me", verifyJwt, getUserProfileController);
userRoutes.patch("/profile", verifyJwt, updateUserProfileController);
