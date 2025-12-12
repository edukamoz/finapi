import { Statement } from '@prisma/client'

export interface ICreateStatementDTO {
  user_id: string
  description: string
  amount: number
  type: 'credit' | 'debit'
}

export interface IStatementsRepository {
  create(data: ICreateStatementDTO): Promise<Statement>
  getUserBalance(user_id: string): Promise<Statement[]>
}
