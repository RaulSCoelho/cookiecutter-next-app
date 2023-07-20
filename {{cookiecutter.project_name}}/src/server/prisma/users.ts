import { Prisma } from '@prisma/client'

import { prisma } from '.'

class UsersApi {
  prisma: Prisma.UserDelegate

  constructor() {
    this.prisma = prisma.user
  }

  async get() {
    try {
      const users = await this.prisma.findMany()
      return { users }
    } catch (error: any) {
      return { error }
    }
  }

  async getById({ id }: { id: string }) {
    try {
      const user = await this.prisma.findUnique({ where: { id } })
      return { user }
    } catch (error: any) {
      return { error }
    }
  }

  async create({ payload }: { payload: Prisma.UserCreateInput }) {
    try {
      const user = await this.prisma.create({ data: payload })
      return { user }
    } catch (error: any) {
      if (error?.code === 'P2002') {
        return { error: new Error('User with this email address already exists!') }
      }
      return { error }
    }
  }
}

export const usersApi = new UsersApi()
