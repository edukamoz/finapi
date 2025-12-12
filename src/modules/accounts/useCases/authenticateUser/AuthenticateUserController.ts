import { Request, Response } from 'express'
import { PrismaUsersRepository } from '../../repositories/PrismaUsersRepository'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const prismaUsersRepository = new PrismaUsersRepository()
    const authenticateUserUseCase = new AuthenticateUserUseCase(
      prismaUsersRepository,
    )

    try {
      const token = await authenticateUserUseCase.execute({
        email,
        password,
      })

      return response.json(token)
    } catch (err) {
      return response.status(401).json({
        error: err instanceof Error ? err.message : 'Unauthorized',
      })
    }
  }
}
