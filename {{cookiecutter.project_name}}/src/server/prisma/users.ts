import { User } from '@prisma/client'

import prisma from '.'

export const usersApi = {
  get,
  getById,
  create,
  update,
  delete: remove
}

async function get() {
  try {
    const users = await prisma.user.findMany()
    return { users }
  } catch (error: any) {
    return { error }
  }
}

async function getById(id: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id } })
    return { user }
  } catch (error: any) {
    return { error }
  }
}

async function create(user: User) {
  try {
    const existingUser = await prisma.user.findUnique({ where: { email: user.email } })
    if (existingUser) throw new Error('User with this email address already exists')

    const created = await prisma.user.create({ data: user })
    return { user: created }
  } catch (error: any) {
    return { error }
  }
}

async function update(user: User) {
  try {
    const { id, ...update } = user

    const existingUser = await prisma.user.findUnique({ where: { email: user.email } })
    if (existingUser && existingUser.id !== id) throw new Error('User with this email address already exists')

    const updated = await prisma.user.update({ data: update, where: { id } })
    return { user: updated }
  } catch (error: any) {
    return { error }
  }
}

async function remove(id: string) {
  try {
    await prisma.user.delete({ where: { id } })
    return {}
  } catch (error: any) {
    return { error }
  }
}
