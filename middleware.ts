import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  const hasAuth = req.cookies.get('auth')?.value

  const isLogin = url.pathname === '/login'
  const isProtected = url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/tasks') || url.pathname.startsWith('/admin')

  if (!hasAuth && isProtected) {
    const loginUrl = new URL('/login', url.origin)
    loginUrl.searchParams.set('next', url.pathname + url.search)
    return NextResponse.redirect(loginUrl)
  }

  if (hasAuth && isLogin) {
    return NextResponse.redirect(new URL('/dashboard', url.origin))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/dashboard/:path*', '/tasks/:path*', '/admin/:path*']
}