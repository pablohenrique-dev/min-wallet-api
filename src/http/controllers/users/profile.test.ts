import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { describe, expect, it } from "vitest";

describe("Profile (e2e)", () => {
  it("Should be able to get the user profile", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const response = await request(app)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({ email: "johndoe@example.com" })
    );
  });
});
