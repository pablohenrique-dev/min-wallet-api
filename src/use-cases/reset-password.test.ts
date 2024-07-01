import { InMemoryResetPasswordTokenRepository } from "@/repositories/in-memory/in-memory-reset-password-token-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ResetPasswordUseCase } from "./reset-password";
import { InvalidCredentialsError } from "./errors/invalid-credentials";
import { InvalidOrExpiredPasswordResetTokenError } from "./errors/invalid-or-expired-password-reset-token";
import { randomBytes } from "crypto";
import dayjs from "dayjs";
import { hash } from "bcryptjs";

describe("Reset password useCase", () => {
  let resetPasswordTokenRepository: InMemoryResetPasswordTokenRepository;
  let usersRepository: InMemoryUsersRepository;
  let sut: ResetPasswordUseCase;

  beforeEach(() => {
    resetPasswordTokenRepository = new InMemoryResetPasswordTokenRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new ResetPasswordUseCase(
      resetPasswordTokenRepository,
      usersRepository
    );
  });

  it("Should not be able to reset the password if the email received doesn't exist", async () => {
    await expect(() =>
      sut.execute({
        token: randomBytes(20).toString("hex"),
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("Should not be able to reset the password if there is no reset token stored on the database", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        token: randomBytes(20).toString("hex"),
        email: "johndoe@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidOrExpiredPasswordResetTokenError);
  });

  it("Should not be able to reset the password if the token received is invalid", async () => {
    const { id: user_id } = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
    });

    const token = randomBytes(20).toString("hex");

    const resetTokenHashed = await hash(token, 6);

    await resetPasswordTokenRepository.create({
      user_id,
      token: resetTokenHashed,
      expiry_date: dayjs().add(1, "hour").toDate(),
    });

    await expect(() =>
      sut.execute({
        token: "just-a-random-string",
        email: "johndoe@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidOrExpiredPasswordResetTokenError);
  });

  it("Should not be able to reset the password if the token received is invalid", async () => {
    const { id: user_id } = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
    });

    const token = randomBytes(20).toString("hex");

    const resetTokenHashed = await hash(token, 6);

    await resetPasswordTokenRepository.create({
      user_id,
      token: resetTokenHashed,
      expiry_date: dayjs().add(-2, "hour").toDate(),
    });

    await expect(() =>
      sut.execute({
        token: token,
        email: "johndoe@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidOrExpiredPasswordResetTokenError);
  });

  it("Should be able to reset the password", async () => {
    const { id: user_id } = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
    });

    const token = randomBytes(20).toString("hex");

    const resetTokenHashed = await hash(token, 6);

    await resetPasswordTokenRepository.create({
      user_id,
      token: resetTokenHashed,
      expiry_date: dayjs().add(1, "hour").toDate(),
    });

    const { user } = await sut.execute({
      email: "johndoe@email.com",
      token,
      password: "654321",
    });

    expect(user).toEqual(
      expect.objectContaining({
        name: "John Doe",
        email: "johndoe@email.com",
      })
    );
  });
});
