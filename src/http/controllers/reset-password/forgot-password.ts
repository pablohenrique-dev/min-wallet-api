import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount";
import { makeForgotPasswordUseCase } from "@/use-cases/factories/make-forgot-password-use-case";
import { sendEmail } from "@/utils/emails/send-email";
import { forgotPasswordEmailTemplate } from "@/utils/emails/templates/raw-html/forgot-password";
import { Request, Response } from "express";
import { z } from "zod";

export async function forgotPasswordController(req: Request, res: Response) {
  const forgotPasswordBodySchema = z.object({
    email: z.string().trim().email(),
  });

  const { email } = forgotPasswordBodySchema.parse(req.body);

  try {
    const forgotPasswordUseCase = makeForgotPasswordUseCase();

    const {
      token,
      email: userEmail,
      username,
    } = await forgotPasswordUseCase.execute({
      email,
    });

    const resetLink = `http://localhost:5173/reset-password?token=${token}&email=${userEmail}`;

    sendEmail({
      to: email,
      subject: "Redefinição de Senha",
      text: `
        Utilize o link abaixo para resetar a sua senha:\n
        ${resetLink}
      `,
      html: forgotPasswordEmailTemplate({ username, resetLink }),
    });

    return res.status(200).json({ token, email });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({
        error: error.message,
      });
    }

    throw error;
  }
}
