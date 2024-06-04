import { Express } from "express";
import request from "supertest";

export async function createAndAuthenticateUser(app: Express) {
  await request(app).post("/register").send({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "123456",
  });

  const authenticateResponse = await request(app).post("/sessions").send({
    email: "johndoe@example.com",
    password: "123456",
  });

  const { token } = authenticateResponse.body;

  const cookies = authenticateResponse.get("Set-Cookie");

  return { token, cookies };
}
