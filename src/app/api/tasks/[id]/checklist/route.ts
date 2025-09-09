import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const auth = getAuthUser()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { itemId, done } = await req.json()
  const update = await prisma.checklistItem.update({
    where: { id: Number(itemId) },
    data: { doneBy: done ? auth.userId : null, doneAt: done ? new Date() : null },
  })
  return NextResponse.json(update)
}
