import { beforeEach, describe, expect, it } from "vitest";
import { ForgotPasswordUseCase } from "./forgot-password";
import { InMemoryResetPasswordTokenRepository } from "@/repositories/in-memory/in-memory-reset-password-token-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-fount";

describe("Forgot password useCase", () => {
  let resetPasswordTokenRepository: InMemoryResetPasswordTokenRepository;
  let userRepository: InMemoryUsersRepository;
  let sut: ForgotPasswordUseCase;

  beforeEach(() => {
    resetPasswordTokenRepository = new InMemoryResetPasswordTokenRepository();
    userRepository = new InMemoryUsersRepository();
    sut = new ForgotPasswordUseCase(
      resetPasswordTokenRepository,
      userRepository
    );
  });

  it("Should be able to create a password reset token", async () => {
    const { email, id } = await userRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
    });

    const { token } = await sut.execute({ email });

    expect(token).toEqual(expect.any(String));
  });

  it("Should not be able to request a password reset if the email passed doesn't exit", async ()=>{
    await expect(()=>
       sut.execute({ email: "test@email.com" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
});
