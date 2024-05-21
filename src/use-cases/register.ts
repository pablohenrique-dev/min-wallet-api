import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

interface RegisterUseCaseParams {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, password, email }: RegisterUseCaseParams) {
    const isEmailAlreadyInUse = await this.usersRepository.findByEmail(email);

    if (isEmailAlreadyInUse) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await hash(password, 6);

    const user = await this.usersRepository.create({
      email,
      password: hashedPassword,
      name,
    });

    return { user };
  }
}
