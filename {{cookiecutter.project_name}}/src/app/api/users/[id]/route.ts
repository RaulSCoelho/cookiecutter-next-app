import { usersApi } from '@/server/prisma/users'
import { NextRequest, NextResponse } from 'next/server'

interface Params {
  params: {
    id: string
  }
}

export async function GET(req: NextRequest, { params: { id } }: Params) {
  const { user, error } = await usersApi.getById({ id })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(user)
}
