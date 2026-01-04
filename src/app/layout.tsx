import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import NotificationsBell from '@/components/NotificationsBell'
import LogoutButton from '@/components/LogoutButton'
import { getAuthUser } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'GRP Tasker',
  description: 'Next-Gen Task & Team Management Hub',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const auth = getAuthUser()
  const isAdmin = auth?.role === 'ADMIN'
  const isAuthed = !!auth
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="bg-gradient-to-r from-violet-950 via-purple-900 to-cyan-900 text-white sticky top-0 z-50 border-b border-purple-500/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <Link href="/" className="text-2xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2 glow-text">
                  <svg className="w-8 h-8 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  GRP Tasker
                </Link>
                <nav className="hidden md:flex items-center space-x-6">
                  <Link href="/" className="hover:text-white/80 transition-colors font-medium">
                    Home
                  </Link>
                  {isAuthed && (
                    <Link href="/dashboard" className="hover:text-white/80 transition-colors font-medium">
                      Dashboard
                    </Link>
                  )}
                  {isAdmin && (
                    <Link href="/admin" className="hover:text-white/80 transition-colors font-medium">
                      Admin
                    </Link>
                  )}
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                {isAuthed && <NotificationsBell />}
                {isAuthed && <LogoutButton />}
                {!isAuthed && (
                  <Link href="/login" className="bg-white text-primary-600 hover:bg-white/90 px-4 py-2 rounded-lg font-medium transition-colors">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-6 py-8 flex-1">
          {children}
        </main>
        <footer className="mt-auto border-t border-border bg-[var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="text-center text-[var(--text-secondary)] text-sm">
              © 2026 GRP Tasker. Built for modern teams.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
