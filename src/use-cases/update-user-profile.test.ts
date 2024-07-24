import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { UpdateUserProfileUseCase } from "./update-user-profile";
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import { ResourceNotFoundError } from "./errors/resource-not-fount";

describe("Update user profile useCase", () => {
  let usersRepository: InMemoryUsersRepository;
  let sut: UpdateUserProfileUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UpdateUserProfileUseCase(usersRepository);
  });

  it("Should not be able to update user's info if the id passed doesn't exist", async () => {
    await expect(() =>
      sut.execute({
        userId: "user-01",
        email: "johndoe@example.com",
        name: "John Doe",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("Should not be able to change the user's email to an existing email", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    await usersRepository.create({
      name: "John Doe Roe",
      email: "johndoeroe@example.com",
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        userId: user.id,
        email: "johndoeroe@example.com",
        name: "John Doe",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("Should be able to update user's info", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const { user: updatedUser } = await sut.execute({
      userId: user.id,
      name: "John Doe Roe",
      email: "johndoeroe@example.com",
    });

    expect(updatedUser).toEqual(
      expect.objectContaining({
        id: user.id,
        name: "John Doe Roe",
        email: "johndoeroe@example.com",
      })
    );
  });
});
