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
      <body className="min-h-screen">
        <header className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-hard">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <Link href="/" className="text-2xl font-bold text-gradient hover:opacity-80 transition-opacity">
                  GRP Tasker
                </Link>
                <nav className="hidden md:flex items-center space-x-6">
                  <Link href="/" className="hover:text-accent-300 transition-colors font-medium">
                    Home
                  </Link>
                  {isAuthed && (
                    <Link href="/dashboard" className="hover:text-accent-300 transition-colors font-medium">
                      Dashboard
                    </Link>
                  )}
                  {isAdmin && (
                    <Link href="/admin" className="hover:text-accent-300 transition-colors font-medium">
                      Admin
                    </Link>
                  )}
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                {isAuthed && <NotificationsBell />}
                {isAuthed && <LogoutButton />}
                {!isAuthed && (
                  <Link href="/login" className="btn-accent text-sm">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
