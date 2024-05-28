import { env } from "@/env";

export const authConfig = {
  secret: env.JWT_SECRET,
  expiresIn: "1d",
};
