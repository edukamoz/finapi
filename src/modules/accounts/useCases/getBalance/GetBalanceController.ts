import { Request, Response } from 'express'
import { PrismaUsersRepository } from '../../../accounts/repositories/PrismaUsersRepository'
import { PrismaStatementsRepository } from '../../statements/repositories/PrismaStatementsRepository'
import { GetBalanceUseCase } from './GetBalanceUseCase'

export class GetBalanceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user

    const prismaStatementsRepository = new PrismaStatementsRepository()
    const prismaUsersRepository = new PrismaUsersRepository()

    const getBalanceUseCase = new GetBalanceUseCase(
      prismaStatementsRepository,
      prismaUsersRepository,
    )

    try {
      const balance = await getBalanceUseCase.execute({ user_id })
      return response.json(balance)
    } catch (err) {
      return response.status(400).json({
        error: err instanceof Error ? err.message : 'Unexpected error',
      })
    }
  }
}
