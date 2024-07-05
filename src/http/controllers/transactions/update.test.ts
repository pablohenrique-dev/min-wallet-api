import { app } from "@/app";
import request from "supertest";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { describe, expect, it } from "vitest";

describe("Update transaction (e2e)", () => {
  it("Should be able to update a transaction", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const newTransaction = await prisma.transaction.create({
      data: {
        title: "My first transaction",
        value: 24.9,
        description: "Just a random description",
        user_id: user.id,
        date: new Date(),
        type: "EXPENSE",
      },
    });

    const response = await request(app)
      .put(`/transactions/${newTransaction.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Another title",
        value: 24.9,
        description: "Just a random description",
        date: new Date(),
        type: "INCOME",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        title: "Another title",
      })
    );
  });
});
