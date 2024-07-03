import { createTransport, TransportOptions } from "nodemailer";
import { env } from "../env/index";

export const transporter = createTransport({
  host: env.MAIL_HOST,
  port: env.MAIL_PORT,
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS,
  },
} as TransportOptions);
