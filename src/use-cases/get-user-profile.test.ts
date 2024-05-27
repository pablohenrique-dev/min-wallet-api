import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-fount";

describe("Get user profile useCase", () => {
  let usersRepository: InMemoryUsersRepository;
  let sut: GetUserProfileUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("Should not be able to get a user if id passed doesn't exist", async () => {
    await expect(() =>
      sut.execute({
        user_id: "user-01",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("Should be able to get a user based on its id", async () => {
    const newUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
    });

    const { user } = await sut.execute({ user_id: newUser.id });

    expect(user).toEqual(
      expect.objectContaining({
        name: "John Doe",
        email: "johndoe@email.com",
      })
    );
  });
});
