import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { describe, expect, it } from "vitest";

describe("Create transaction (e2e)", () => {
  it("Should be able to create a transaction", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const response = await request(app)
      .post("/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "My first transaction",
        value: 24.9,
        description: "Just a random description",
      });

    expect(response.statusCode).toBe(200);
    
  });
});
