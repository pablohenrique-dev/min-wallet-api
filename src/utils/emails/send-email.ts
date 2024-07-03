import { transporter } from "@/config/email";
import { env } from "@/env";

interface SendEmailParams {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export function sendEmail({ to, subject, text, html }: SendEmailParams) {
  return transporter.sendMail({
    from: env.MAIL_FROM,
    to,
    subject,
    text,
    html,
  });
}
