import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'
import { z } from 'zod'

export async function GET() {
  const auth = getAuthUser()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const tasks = await prisma.task.findMany({
    where: { assignees: { some: { id: auth.userId } } },
    include: { checklist: true, comments: true },
  })
  return NextResponse.json(tasks)
}

const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  priority: z.enum(['HIGH', 'MEDIUM', 'LOW']).default('MEDIUM'),
  deadline: z.string().datetime().optional(),
  resources: z.any().optional(),
  assigneeIds: z.array(z.number()).default([]),
  groupId: z.number().optional(),
  checklist: z.array(z.string()).default([]),
  recurring: z.string().optional(),
})

export async function POST(req: Request) {
  const auth = getAuthUser()
  if (!auth || auth.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const body = await req.json()
  const parsed = createSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  const { title, description, priority, deadline, resources, assigneeIds, groupId, checklist, recurring } = parsed.data

  // If a groupId is provided, auto-assign all users of that group in addition to explicit assigneeIds
  let finalAssigneeIds: number[] = [...assigneeIds]
  if (groupId) {
    const groupUsers = await prisma.group.findUnique({ where: { id: groupId }, select: { users: { select: { id: true } } } })
    if (groupUsers) {
      for (const u of groupUsers.users) {
        if (!finalAssigneeIds.includes(u.id)) finalAssigneeIds.push(u.id)
      }
    }
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      priority,
      deadline: deadline ? new Date(deadline) : undefined,
      resources: resources ? JSON.stringify(resources) : undefined,
      recurring,
      groupId,
      assignees: { connect: finalAssigneeIds.map((id: number) => ({ id })) },
      checklist: { create: checklist.map((text: string) => ({ text })) },
    },
    include: { checklist: true },
  })
  return NextResponse.json(task)
}
