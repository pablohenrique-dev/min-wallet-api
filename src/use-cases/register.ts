import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import { User } from "@/repositories/model/user";

interface RegisterUseCaseParams {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    password,
    email,
  }: RegisterUseCaseParams): Promise<RegisterUseCaseResponse> {
    const isEmailAlreadyInUse = await this.usersRepository.findByEmail(email);

    if (isEmailAlreadyInUse) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await hash(password, 6);

    const user = await this.usersRepository.create({
      email,
      password_hashed: hashedPassword,
      name,
    });

    return { user };
  }
}
