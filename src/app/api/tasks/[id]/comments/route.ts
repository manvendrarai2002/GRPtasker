import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const auth = getAuthUser()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { text } = await req.json()
  const taskId = Number(params.id)
  const comment = await prisma.comment.create({ data: { text, authorId: auth.userId, taskId } })
  // notify task assignees except the author
  const task = await prisma.task.findUnique({ where: { id: taskId }, select: { assignees: { select: { id: true } }, title: true } })
  if (task) {
    const recipients = (task.assignees as Array<{ id: number }>).map((a: { id: number }) => a.id).filter((id: number) => id !== auth.userId)
    if (recipients.length) {
      await prisma.notification.createMany({
        data: recipients.map((userId: number) => ({
          userId,
          type: 'comment',
          message: `New comment on: ${task.title}`,
          meta: JSON.stringify({ taskId }),
        }))
      })
    }
  }
  return NextResponse.json(comment)
}
