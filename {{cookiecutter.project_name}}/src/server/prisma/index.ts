import {
  PrismaApiBase,
  PrismaApiCreate,
  PrismaApiByField,
  PrismaApiById,
  PrismaApiUpdate,
  PrismaApiResponse,
  Collection
} from '@/types/prisma'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class PrismaApi<T> {
  prisma: any

  constructor(collection: Collection) {
    this.prisma = prisma[collection]
  }

  async get({ raiseError }: PrismaApiBase = {}): Promise<PrismaApiResponse<T[]>> {
    try {
      const result = await this.prisma.findMany()
      return { result }
    } catch (error: any) {
      if (raiseError) throw error
      return { error }
    }
  }

  async getById({ id, raiseError }: PrismaApiById): Promise<PrismaApiResponse<T>> {
    try {
      const result = await this.prisma.findUnique({ where: { id } })
      return { result }
    } catch (error: any) {
      if (raiseError) throw error
      return { error }
    }
  }

  async getByField({ field, value, raiseError }: PrismaApiByField<T>): Promise<PrismaApiResponse<T>> {
    try {
      const result = await this.prisma.findUnique({ where: { [field]: value } })
      return { result }
    } catch (error: any) {
      if (raiseError) throw error
      return { error }
    }
  }

  async create({ payload, raiseError }: PrismaApiCreate<T>): Promise<PrismaApiResponse<T>> {
    try {
      const result = await this.prisma.create({ data: payload })
      return { result }
    } catch (error: any) {
      if (raiseError) throw error
      return { error }
    }
  }

  async update({ payload, raiseError }: PrismaApiUpdate<T>): Promise<PrismaApiResponse<T>> {
    try {
      const { id, ...upload } = payload
      const result = await this.prisma.update({ data: upload, where: { id } })
      return { result }
    } catch (error: any) {
      if (raiseError) throw error
      return { error }
    }
  }

  async remove({ id, raiseError }: PrismaApiById): Promise<PrismaApiResponse<undefined>> {
    try {
      await this.prisma.delete({ where: { id } })
      return {}
    } catch (error: any) {
      if (raiseError) throw error
      return { error }
    }
  }
}
