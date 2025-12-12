import { IUsersRepository } from '../../../accounts/repositories/IUsersRepository'
import { IStatementsRepository } from '../../statements/repositories/IStatementsRepository'

interface IRequest {
  user_id: string
  description: string
  amount: number
  type: 'credit' | 'debit'
}

export class CreateStatementUseCase {
  constructor(
    private statementsRepository: IStatementsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id, type, amount, description }: IRequest) {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new Error('User not found')
    }

    if (type === 'debit') {
      const userStatements =
        await this.statementsRepository.getUserBalance(user_id)

      const balance = userStatements.reduce((acc, operation) => {
        if (operation.type === 'credit') {
          return acc + Number(operation.amount)
        } else {
          return acc - Number(operation.amount)
        }
      }, 0)

      if (amount > balance) {
        throw new Error('Insufficient funds')
      }
    }

    const statementOperation = await this.statementsRepository.create({
      user_id,
      type,
      amount,
      description,
    })

    return statementOperation
  }
}
