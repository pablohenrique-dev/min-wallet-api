import { describe, expect, it, vi } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { sendEmail } from "@/utils/emails/send-email";

vi.mock("@/utils/emails/send-email");

describe("Reset password (e2e)", () => {
  it("Should be able to reset password", async () => {
    await createAndAuthenticateUser(app);

    const forgotPasswordResponse = await request(app)
      .post("/forgot-password")
      .send({
        email: "johndoe@example.com",
      });

    const response = await request(app).put("/reset-password").send({
      email: forgotPasswordResponse.body.email,
      token: forgotPasswordResponse.body.token,
      password: "654321",
    });

    expect(sendEmail).toHaveBeenCalled();
    expect(sendEmail).toHaveBeenCalledWith({
      to: "johndoe@example.com",
      subject: "Redefinição de Senha",
      text: "Redefinição de senha realizada com sucesso!",
      html: expect.any(String),
    });
    expect(response.statusCode).toBe(200);
  });
});
