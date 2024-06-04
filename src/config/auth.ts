import { env } from "@/env";

export const authConfig = {
  secret: env.JWT_SECRET,
  expiresIn: {
    "1h": "1h",
    "7d": "7d",
  },
};
