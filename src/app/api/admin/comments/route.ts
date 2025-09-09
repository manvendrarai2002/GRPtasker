import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  const auth = getAuthUser()
  if (!auth || auth.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: { author: { select: { id: true, name: true, email: true } }, task: { select: { id: true, title: true, groupId: true } } },
  })
  return NextResponse.json(comments)
}
