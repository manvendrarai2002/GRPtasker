import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const auth = getAuthUser()
  if (!auth || auth.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { userIds } = await req.json()
  const groupId = Number(params.id)

  if (!Array.isArray(userIds)) {
    return NextResponse.json({ error: 'userIds must be an array' }, { status: 400 })
  }

  const group = await prisma.group.update({
    where: { id: groupId },
    data: {
      users: {
        set: userIds.map((id: number) => ({ id })),
      },
    },
  })
  return NextResponse.json(group)
}
