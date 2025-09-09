import { getAuthUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function DashboardPage() {
  const auth = getAuthUser()
  if (!auth) return <main className="p-8">Unauthorized. <a className="text-blue-600" href="/login">Login</a></main>
  const tasks = await prisma.task.findMany({ where: { assignees: { some: { id: auth.userId } } }, include: { checklist: true } })
  const priorityOrder: Record<string, number> = { HIGH: 0, MEDIUM: 1, LOW: 2 }
  tasks.sort((a: any, b: any) => {
    const pa = priorityOrder[a.priority] ?? 9
    const pb = priorityOrder[b.priority] ?? 9
    if (pa !== pb) return pa - pb
    const da = a.deadline ? new Date(a.deadline).getTime() : Infinity
    const db = b.deadline ? new Date(b.deadline).getTime() : Infinity
    return da - db
  })

  function Badge({ t }: { t: any }) {
    const now = Date.now()
    const dl = t.deadline ? new Date(t.deadline).getTime() : null
    if (!dl) return null
    const oneDay = 24*60*60*1000
    if (dl < now) return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-danger/10 text-danger">Overdue</span>
    if (dl - now < oneDay) return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">Due Soon</span>
    return null
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">My Tasks</h1>
          <p className="text-[var(--text-secondary)] mt-2">Track your progress and stay organized</p>
        </div>
        {auth.role === 'ADMIN' && (
          <Link href="/admin" className="btn-secondary">
            Admin Panel
          </Link>
        )}
      </div>

      {tasks.length === 0 ? (
        <div className="card text-center py-12">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">No tasks assigned</h3>
          <p className="text-[var(--text-secondary)]">You're all caught up! Check back later for new assignments.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tasks.map((t: any) => {
            const total = t.checklist.length || 1
            const done = t.checklist.filter((c: any) => !!c.doneAt).length
            const pct = Math.round((done / total) * 100)
            return (
              <div key={t.id} className="card hover:shadow-medium transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Link href={`/tasks/${t.id}`} className="text-lg font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                        {t.title}
                      </Link>
                      <Badge t={t} />
                    </div>
                    <p className="text-[var(--text-secondary)] mb-3">{t.description}</p>
                    <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        t.priority === 'HIGH' ? 'bg-danger/10 text-danger' :
                        t.priority === 'MEDIUM' ? 'bg-warning/10 text-warning' :
                        'bg-info/10 text-info'
                      }`}>
                        {t.priority}
                      </span>
                      {t.deadline && (
                        <span>Due: {new Date(t.deadline).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">{pct}%</div>
                    <div className="text-sm text-[var(--text-secondary)]">Complete</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
