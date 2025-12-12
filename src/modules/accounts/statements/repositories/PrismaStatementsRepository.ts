import { Statement } from '@prisma/client'
import { prisma } from '../../../../database/prismaClient'
import {
  ICreateStatementDTO,
  IStatementsRepository,
} from './IStatementsRepository'

export class PrismaStatementsRepository implements IStatementsRepository {
  async create({
    user_id,
    amount,
    description,
    type,
  }: ICreateStatementDTO): Promise<Statement> {
    const statement = await prisma.statement.create({
      data: {
        user_id,
        amount,
        description,
        type,
      },
    })

    return statement
  }

  async getUserBalance(user_id: string): Promise<Statement[]> {
    const statements = await prisma.statement.findMany({
      where: { user_id },
    })

    return statements
  }
}
