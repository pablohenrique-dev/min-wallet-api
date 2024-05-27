import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials";
import { hash } from "bcryptjs";

describe("Authenticate useCase", () => {
  let usersRepository: InMemoryUsersRepository;
  let sut: AuthenticateUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("Should not be able to authenticate if e-mail doesn't exist", async () => {
    await usersRepository.create({
      name: "First user",
      email: "johndoe@email.com",
      password_hashed: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "johndoe1@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("Should not be able to authenticate if password passed is wrong", async () => {
    await usersRepository.create({
      name: "First user",
      email: "johndoe@email.com",
      password_hashed: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "johndoe@email.com",
        password: "654321",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("Should be able to authenticate if credentials passed are correct", async () => {
    await usersRepository.create({
      name: "First user",
      email: "johndoe@email.com",
      password_hashed: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "johndoe@email.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toBe("First user");
    expect(user.email).toBe("johndoe@email.com");
  });
});
