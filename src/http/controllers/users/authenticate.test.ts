import request from "supertest";
import { app } from "@/app";
import { describe, expect, it } from "vitest";

describe("Authenticate (e2e)", () => {
  it("Should be able to authenticate a user", async () => {
    await request(app).post("/register").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const response = await request(app).post("/sessions").send({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
