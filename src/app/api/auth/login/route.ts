import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { signToken } from '@/lib/auth'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  const token = signToken({ userId: user.id, role: user.role as any })
  const res = NextResponse.json({ ok: true })
  res.cookies.set('auth', token, { httpOnly: true, sameSite: 'lax', path: '/' })
  return res
}
