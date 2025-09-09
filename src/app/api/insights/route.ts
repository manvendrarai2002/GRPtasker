import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  const auth = getAuthUser()
  if (!auth || auth.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const tasks = await prisma.task.findMany({ include: { checklist: true, assignees: true } })

  const now = new Date()
  const overdue = tasks.filter((t: any) => t.deadline && new Date(t.deadline) < now)
  const heavyInit: Record<number, number> = {}
  const heavy = tasks.reduce((acc: Record<number, number>, t: any) => { for (const a of t.assignees) acc[a.id] = (acc[a.id] || 0) + 1; return acc }, heavyInit)
  const topAssignee = (Object.entries(heavy) as Array<[string, number]>).sort((a,b) => b[1]-a[1])[0]
  const slow = tasks.filter((t: any) => t.checklist.length && t.checklist.filter((c: any) => c.doneAt).length / t.checklist.length < 0.5)

  const suggestions: string[] = []
  if (overdue.length) suggestions.push(`${overdue.length} task(s) are overdue. Consider reassigning or adjusting deadlines.`)
  if (topAssignee) suggestions.push(`User ${topAssignee[0]} has the most tasks (${topAssignee[1]}). Consider distributing load.`)
  if (slow.length) suggestions.push(`${slow.length} task(s) have <50% progress. Check blockers.`)

  return NextResponse.json({ suggestions, counts: { overdue: overdue.length, slow: slow.length } })
}
