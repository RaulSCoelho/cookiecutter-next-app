import { PrismaApiCreate, PrismaApiResponse, PrismaApiUpdate } from '@/types/prisma'
import { User } from '@prisma/client'

import { PrismaApi } from '.'

export class UsersApi extends PrismaApi<User> {
  constructor() {
    super('user')
  }

  override async create({ payload, raiseError }: PrismaApiCreate<User>): Promise<PrismaApiResponse<User>> {
    const { result, error } = await super.create({ payload, raiseError })

    if (error?.code === 'P2002') {
      return { result, error: new Error('User with this email address already exists!') }
    }

    return { result, error }
  }

  override async update({ payload, raiseError }: PrismaApiUpdate<User>): Promise<PrismaApiResponse<User>> {
    const { result, error } = await super.update({ payload, raiseError })

    if (error?.code === 'P2002') {
      return { result, error: new Error('User with this email address already exists!') }
    }

    return { result, error }
  }
}
