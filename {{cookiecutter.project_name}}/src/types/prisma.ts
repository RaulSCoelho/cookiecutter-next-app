import { PrismaClient } from '@prisma/client'

type IgnorePrismaBuiltins<T extends string | symbol> = T extends `$${string}` ? never : T

export type Collection = IgnorePrismaBuiltins<keyof typeof PrismaClient.prototype>

export interface PrismaApiResponse<T> {
  result?: T
  error?: Record<string, any>
}

export interface PrismaApiBase {
  raiseError?: boolean
}

export interface PrismaApiById extends PrismaApiBase {
  id: string
}

export interface PrismaApiByField<T> extends PrismaApiBase {
  field: keyof T
  value: T[keyof T]
}

export interface PrismaApiCreate<T> extends PrismaApiBase {
  payload: Partial<T & { id: never }>
}

export interface PrismaApiUpdate<T> extends PrismaApiBase {
  payload: Partial<T & { id: string }>
}
