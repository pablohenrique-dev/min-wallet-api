import request from "supertest";
import { app } from "@/app";
import { describe, expect, it } from "vitest";

describe("Register (e2e)", () => {
  it("Should be able to register a user", async () => {
    const response = await request(app).post("/register").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(200);
  });
});
