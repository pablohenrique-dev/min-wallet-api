import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Update user profile e2e", () => {
  it("Should be able to update user's info", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const response = await request(app)
      .patch("/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "johndoeroe@example.com",
        name: "John Doe Roe",
      });

    expect(response.statusCode).toBe(200);
  });
});
