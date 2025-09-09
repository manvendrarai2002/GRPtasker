import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const auth = getAuthUser()
  if (!auth || auth.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  
  const id = Number(params.id)
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid task ID' }, { status: 400 })
  }

  try {
    const id = Number(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid task ID' }, { status: 400 })
    }

    // The `meta` field in Notification is a JSON string, so we search for the taskId within it.
    // This is not ideal; a direct relation would be better.
    // Example meta: {"taskId":123}
    const notifications = await prisma.notification.findMany({
      where: { meta: { contains: `"taskId":${id}` } },
    })
    const notificationIds = notifications.map(n => n.id)

    await prisma.$transaction([
      prisma.notification.deleteMany({ where: { id: { in: notificationIds } } }),
      prisma.comment.deleteMany({ where: { taskId: id } }),
      prisma.checklistItem.deleteMany({ where: { taskId: id } }),
      prisma.task.delete({ where: { id } }),
    ])
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to delete task:', error)
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 })
  }
}
