import { User } from "@/repositories/model/user";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-fount";

interface GetUserProfileUseCaseParams {
  user_id: string;
}

interface GetUserProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    user_id,
  }: GetUserProfileUseCaseParams): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}
