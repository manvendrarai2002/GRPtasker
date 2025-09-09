import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

import bcrypt from 'bcryptjs'

export async function GET() {
  const auth = getAuthUser()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true, domain: true } })
  return NextResponse.json(users)
}

export async function POST(req: Request) {
  const auth = getAuthUser()
  if (!auth || auth.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { name, email, password, employeeId, role, domain } = await req.json()

  if (!name || !email || !password || !employeeId || !role) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        employeeId,
        role,
        domain,
      },
    })
    return NextResponse.json(user, { status: 201 })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Email or Employee ID already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
