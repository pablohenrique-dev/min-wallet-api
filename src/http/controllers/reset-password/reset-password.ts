import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials";
import { InvalidOrExpiredPasswordResetTokenError } from "@/use-cases/errors/invalid-or-expired-password-reset-token";
import { makeResetPasswordUseCase } from "@/use-cases/factories/make-reset-password-use-case";
import { sendEmail } from "@/utils/emails/send-email";
import { resetPasswordEmailTemplate } from "@/utils/emails/templates/raw-html/reset-password";
import { Request, Response } from "express";
import { z } from "zod";

export async function resetPasswordController(req: Request, res: Response) {
  const resetPasswordBodySchema = z.object({
    token: z
      .string()
      .min(40, { message: "Token must be 40 characters long!" })
      .trim(),
    email: z.string().trim().email(),
    password: z
      .string()
      .min(6, { message: "The password must be at least 6 characters long!" }),
  });

  const { email, password, token } = resetPasswordBodySchema.parse(req.body);

  try {
    const resetPasswordUseCase = makeResetPasswordUseCase();

    const { user } = await resetPasswordUseCase.execute({
      email,
      password,
      token,
    });

    sendEmail({
      to: email,
      subject: "Redefinição de Senha",
      text: "Redefinição de senha realizada com sucesso!",
      html: resetPasswordEmailTemplate({ username: user.name }),
    });

    return res.status(200).json();
  } catch (error) {
    if (
      error instanceof InvalidCredentialsError ||
      error instanceof InvalidOrExpiredPasswordResetTokenError
    ) {
      return res.status(400).json({
        error: error.message,
      });
    }

    throw error;
  }
}
