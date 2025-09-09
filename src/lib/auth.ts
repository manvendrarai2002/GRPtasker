import jwt, { type Secret, type SignOptions } from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'dev-secret-change-me'

export type JwtPayload = { userId: number; role: 'ADMIN' | 'EMPLOYEE' }

export function signToken(payload: JwtPayload, expiresIn: number | string = '7d') {
  const options: SignOptions = { expiresIn: expiresIn as SignOptions['expiresIn'] }
  return jwt.sign(payload, JWT_SECRET, options)
}

export function verifyToken(token: string): JwtPayload | null {
  try {
  return jwt.verify(token, JWT_SECRET) as JwtPayload
  } catch {
    return null
  }
}

export function getAuthUser() {
  const cookieStore = cookies()
  const token = cookieStore.get('auth')?.value
  if (!token) return null
  return verifyToken(token)
}
