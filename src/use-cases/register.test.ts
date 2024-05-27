import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { describe, expect, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

describe("Register useCase", () => {
  let usersRepository: InMemoryUsersRepository;
  let sut: RegisterUseCase;

  const password = "123456";

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("Should be able to hash the password", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@email.com",
      password,
    });

    const isPasswordHashed = await compare(password, user.password_hashed);

    expect(isPasswordHashed).toBe(true);
  });

  it("Should be able to create a new user", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@email.com",
      password,
    });

    expect(user).toEqual(
      expect.objectContaining({
        name: "John Doe",
        email: "johndoe@email.com",
      })
    );
  });

  it("Should not create a user if email is already in use", async () => {
    const email = "johndoe@email.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(() => {
      return sut.execute({
        name: "John Doe",
        email,
        password: "123456",
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
