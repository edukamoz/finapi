import { User } from '@prisma/client'
import { prisma } from '../../../database/prismaClient'
import { ICreateUserDTO, IUsersRepository } from './IUsersRepository'

export class PrismaUsersRepository implements IUsersRepository {
  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    })
    return user
  }
}
