import { UsersRepository } from "@/repositories/users-repository";

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
      throw new Error("Este e-mail já está em uso!");
    }

    const user = await this.usersRepository.create({email, password, name});

    return { user };
  }
}
