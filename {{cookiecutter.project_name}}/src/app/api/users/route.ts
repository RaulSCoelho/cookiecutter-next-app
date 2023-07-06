import { UsersApi } from '@/server/prisma/users'
import { createUserSchema } from '@/types/user'
import { User } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

type UserRequest = Omit<NextRequest, 'body'> & {
  body: User
}

const { get, create } = new UsersApi()

export async function GET() {
  const { result: users, error } = await get()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(users)
}

export async function POST(req: UserRequest) {
  const body = await req.json()
  const userToCreate = createUserSchema.parse(body)
  const { result: user, error } = await create({ payload: userToCreate })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(user)
}
