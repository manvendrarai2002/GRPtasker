import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  const auth = getAuthUser()
  if (!auth || auth.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const [tasks, groups] = await Promise.all([
    prisma.task.findMany({ include: { checklist: true, assignees: true } }),
    prisma.group.findMany({ include: { tasks: true } }),
  ])
  const byPriorityInit: Record<string, number> = {}
  const byPriority = tasks.reduce((acc: Record<string, number>, t: any) => { acc[t.priority] = (acc[t.priority] || 0) + 1; return acc }, byPriorityInit)
  const completion = tasks.map((t: any) => ({ id: t.id, title: t.title, pct: t.checklist.length ? Math.round(t.checklist.filter((c: any) => c.doneAt).length / t.checklist.length * 100) : 0 }))
  const byGroup = groups.map((g: any) => ({ id: g.id, name: g.name, taskCount: g.tasks.length }))
  return NextResponse.json({ totals: { tasks: tasks.length, groups: groups.length }, byPriority, byGroup, completion })
}
