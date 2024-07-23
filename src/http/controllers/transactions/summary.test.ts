import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Transaction summary e2e", () => {
  it("Should be able to get transactions summary", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    await prisma.transaction.createMany({
      data: [
        {
          title: "First transaction",
          value: 10,
          description: "",
          user_id: user.id,
          date: new Date(),
          type: "INCOME",
        },
        {
          title: "Second transaction",
          value: 20,
          description: "",
          user_id: user.id,
          date: new Date(),
          type: "EXPENSE",
        },
        {
          title: "Third transaction",
          value: 30,
          description: "",
          user_id: user.id,
          date: new Date(),
          type: "EXPENSE",
        },
      ],
    });

    const response = await request(app)
      .get("/transactions/summary")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        amount: 3,
        totalIncome: 10,
        totalExpense: 50,
        balance: -40,
      })
    );
  });
});
