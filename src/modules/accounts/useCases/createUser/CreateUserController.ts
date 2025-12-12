import { Request, Response } from 'express'
import { PrismaUsersRepository } from '../../repositories/PrismaUsersRepository'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const prismaUsersRepository = new PrismaUsersRepository()
    const createUserUseCase = new CreateUserUseCase(prismaUsersRepository)

    try {
      await createUserUseCase.execute({
        name,
        email,
        password,
      })

      return response.status(201).send()
    } catch (err) {
      return response.status(400).json({
        error: err instanceof Error ? err.message : 'Unexpected error',
      })
    }
  }
}
