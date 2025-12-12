import { Request, Response } from 'express'
import { PrismaUsersRepository } from '../../../accounts/repositories/PrismaUsersRepository'
import { CreateStatementUseCase } from './CreateStatementUseCase'
import { PrismaStatementsRepository } from '../../statements/repositories/PrismaStatementsRepository'

export class CreateStatementController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user
    const { amount, description, type } = request.body

    const prismaStatementsRepository = new PrismaStatementsRepository()
    const prismaUsersRepository = new PrismaUsersRepository()

    const createStatementUseCase = new CreateStatementUseCase(
      prismaStatementsRepository,
      prismaUsersRepository,
    )

    try {
      const statement = await createStatementUseCase.execute({
        user_id,
        type,
        amount,
        description,
      })

      return response.status(201).json(statement)
    } catch (err) {
      return response.status(400).json({
        error: err instanceof Error ? err.message : 'Unexpected error',
      })
    }
  }
}
