import { app } from "@/app";
import request from "supertest";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { describe, expect, it } from "vitest";

describe("Get transactions (e2e)", () => {
  it("Should be able to get transactions", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    await prisma.transaction.createMany({
      data: [
        {
          title: "First transaction",
          value: 10,
          description: "",
          user_id: user.id,
        },
        {
          title: "Second transaction",
          value: 20,
          description: "",
          user_id: user.id,
        },
        {
          title: "Third transaction",
          value: 30,
          description: "",
          user_id: user.id,
        },
      ],
    });

    const response = await request(app)
      .get("/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        count: expect.any(Number),
        pages: expect.any(Number),
        next_page: null,
        previous_page: null,
        transactions: expect.any(Array),
      })
    );
  });
});
