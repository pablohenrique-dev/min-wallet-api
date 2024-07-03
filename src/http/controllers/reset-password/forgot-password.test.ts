import { describe, expect, it, vi } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { sendEmail } from "@/utils/emails/send-email";

vi.mock("@/utils/emails/send-email");

describe("Forgot password (e2e)", () => {
  it("Should be able to request a password reset", async () => {
    await createAndAuthenticateUser(app);

    const response = await request(app).post("/forgot-password").send({
      email: "johndoe@example.com",
    });

    expect(sendEmail).toHaveBeenCalled();
    expect(sendEmail).toHaveBeenCalledWith({
      to: "johndoe@example.com",
      subject: "Redefinição de Senha",
      text: expect.any(String),
      html: expect.any(String),
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({
      email: "johndoe@example.com",
    }))
  });
});
