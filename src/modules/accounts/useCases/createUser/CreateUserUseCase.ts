import { hash } from 'bcryptjs'
import {
  ICreateUserDTO,
  IUsersRepository,
} from '../../repositories/IUsersRepository'

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const passwordHash = await hash(password, 8)

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    })
  }
}
