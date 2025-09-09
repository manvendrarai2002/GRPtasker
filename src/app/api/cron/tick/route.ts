import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

function addDays(date: Date, days: number) { const d = new Date(date); d.setDate(d.getDate() + days); return d }

export async function POST() {
  const auth = getAuthUser()
  if (!auth || auth.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const now = new Date()
  const soon = new Date(now.getTime() + 24*60*60*1000)

  const tasks = await prisma.task.findMany({ include: { assignees: true } })
  let notifCount = 0
  for (const t of tasks) {
    // deadline reminders
    if (t.deadline && new Date(t.deadline) <= soon && new Date(t.deadline) >= now) {
      for (const a of t.assignees) {
        await prisma.notification.create({ data: { userId: a.id, type: 'deadline', message: `Upcoming deadline: ${t.title}`, meta: JSON.stringify({ taskId: t.id }) } })
        notifCount++
      }
    }
    // recurring: simple DAILY|WEEKLY handling
    if (t.recurring && t.deadline && new Date(t.deadline) < now) {
      const recurring = t.recurring.toUpperCase()
      let nextDeadline: Date | null = null
      if (recurring === 'DAILY') nextDeadline = addDays(new Date(t.deadline), 1)
      if (recurring === 'WEEKLY') nextDeadline = addDays(new Date(t.deadline), 7)
      if (nextDeadline) {
        await prisma.task.create({
          data: {
            title: t.title,
            description: t.description,
            priority: t.priority,
            deadline: nextDeadline,
            resources: t.resources,
            recurring: t.recurring,
            groupId: t.groupId ?? undefined,
            assignees: { connect: t.assignees.map((a: any) => ({ id: a.id })) },
          }
        })
      }
    }
  }
  return NextResponse.json({ ok: true, notifications: notifCount })
}
