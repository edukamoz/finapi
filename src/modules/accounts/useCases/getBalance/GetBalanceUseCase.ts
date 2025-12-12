import { IUsersRepository } from '../../../accounts/repositories/IUsersRepository'
import { IStatementsRepository } from '../../statements/repositories/IStatementsRepository'

interface IRequest {
  user_id: string
}

interface IResponse {
  statement: any[]
  balance: number
}

export class GetBalanceUseCase {
  constructor(
    private statementsRepository: IStatementsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new Error('User not found')
    }

    const statement = await this.statementsRepository.getUserBalance(user_id)

    const balance = statement.reduce((acc, operation) => {
      if (operation.type === 'credit') {
        return acc + Number(operation.amount)
      } else {
        return acc - Number(operation.amount)
      }
    }, 0)

    return {
      statement,
      balance,
    }
  }
}
