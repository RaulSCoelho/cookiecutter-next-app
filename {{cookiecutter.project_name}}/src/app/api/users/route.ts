import { usersApi } from '@/server/prisma/users'
import { createUserSchema } from '@/types/user'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const { users, error } = await usersApi.get()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(users)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const userToCreate = createUserSchema.parse(body)
  const { user, error } = await usersApi.create({ payload: userToCreate })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(user)
}
