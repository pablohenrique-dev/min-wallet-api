import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";

describe("Register useCase", () => {
  it("Should be able to create a new user", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const sut = new RegisterUseCase(inMemoryUsersRepository);

    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
    });

    expect(user).toEqual(
      expect.objectContaining({
        name: "John Doe",
        email: "johndoe@email.com",
        password: "123456",
      })
    );
  });
});
