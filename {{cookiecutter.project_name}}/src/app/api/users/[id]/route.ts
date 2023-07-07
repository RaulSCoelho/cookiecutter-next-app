import { usersApi } from '@/server/prisma/users'
import { updateUserSchema } from '@/types/user'
import { User } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

type UserRequest = Omit<NextRequest, 'body'> & {
  body: User
}

interface Params {
  params: {
    id: string
  }
}

export async function GET(req: NextRequest, { params: { id } }: Params) {
  const { result: user, error } = await usersApi.getById({ id })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(user)
}

export async function PUT(req: UserRequest, { params: { id } }: Params) {
  const body = await req.json()
  const userToUpdate = updateUserSchema.parse({ ...body, id })
  const { result: user, error } = await usersApi.update({ payload: userToUpdate })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(user)
}

export async function DELETE(req: NextRequest, { params: { id } }: Params) {
  const { error } = await usersApi.remove({ id })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: 'User deleted successfully' })
}
