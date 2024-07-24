import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-fount";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

interface UpdateUserProfileUseCaseParams {
  userId: string;
  email: string;
  name: string;
}

interface UpdateUserProfileUseCaseResponse {
  user: User;
}

export class UpdateUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    email,
    name,
  }: UpdateUserProfileUseCaseParams): Promise<UpdateUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const isEmailAlreadyInUse = await this.usersRepository.findByEmail(email);

    if (isEmailAlreadyInUse && email !== user.email) {
      throw new UserAlreadyExistsError();
    }

    const userUpdated = await this.usersRepository.updateProfile({
      userId,
      email,
      name,
    });

    return { user: userUpdated };
  }
}
