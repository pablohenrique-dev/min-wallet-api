import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";

describe("Delete transaction (e2e)", () => {
  it("Should be able to delete a transaction", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const newTransaction = await prisma.transaction.create({
      data: {
        title: "My first transaction",
        value: 24.9,
        description: "Just a random description",
        user_id: user.id,
        date: new Date(),
        type: "EXPENSE"
      },
    });

    const response = await request(app)
      .del(`/transactions/${newTransaction.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(204);
  });
});
