import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  const auth = getAuthUser()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const groups = await prisma.group.findMany({ include: { users: true } })
  return NextResponse.json(groups)
}

export async function POST(req: Request) {
  const auth = getAuthUser()
  if (!auth || auth.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { name, domain, userIds } = await req.json()
  const data: any = { name }
  if (domain) data.domain = domain
  if (Array.isArray(userIds) && userIds.length) {
    data.users = { connect: userIds.map((id: number) => ({ id })) }
  } else if (domain) {
    const users = await prisma.user.findMany({ where: { email: { endsWith: `@${domain}` } } })
    data.users = { connect: users.map((u: { id: number }) => ({ id: u.id })) }
  }
  const group = await prisma.group.create({ data })
  return NextResponse.json(group)
}
