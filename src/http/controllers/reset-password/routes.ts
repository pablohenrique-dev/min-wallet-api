import { Router } from "express";
import { forgotPasswordController } from "./forgot-password";
import { resetPasswordController } from "./reset-password";

export const resetPasswordRoutes = Router();

resetPasswordRoutes.post("/forgot-password", forgotPasswordController);
resetPasswordRoutes.put("/reset-password", resetPasswordController);
