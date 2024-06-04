import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { describe, expect, it } from "vitest";

describe("Refresh (e2e)", () => {
  it("Should be able to refresh the access token", async () => {
    const { cookies } = await createAndAuthenticateUser(app);

    const response = await request(app)
      .patch("/token/refresh")
      .set("Cookie", cookies!)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
