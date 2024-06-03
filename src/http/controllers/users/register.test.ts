import request from "supertest";
import { app } from "@/app";
import { describe, expect, it } from "vitest";

describe("Register (e2e)", () => {
  it("Should be able to register a user", async () => {
    const response = await request(app).post("/register").send({
      name: "John Doe",
      email: "johndoe1@example.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(200);
  });

  it("Should not be able to create a user if email already exists", async () => {
    await request(app).post("/register").send({
      name: "John Doe",
      email: "johndoe2@example.com",
      password: "123456",
    });

    const response = await request(app).post("/register").send({
      name: "John Doe",
      email: "johndoe2@example.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(409);
  });
});
