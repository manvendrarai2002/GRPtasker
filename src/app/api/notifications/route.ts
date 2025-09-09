import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  const auth = getAuthUser()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const items = await prisma.notification.findMany({ where: { userId: auth.userId }, orderBy: { createdAt: 'desc' } })
  return NextResponse.json(items)
}

export async function PATCH(req: Request) {
  const auth = getAuthUser()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { ids } = await req.json()
  await prisma.notification.updateMany({ where: { id: { in: ids ?? [] }, userId: auth.userId }, data: { readAt: new Date() } })
  return NextResponse.json({ ok: true })
}
