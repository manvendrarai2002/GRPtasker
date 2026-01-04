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
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gradient">My Tasks</h1>
          <p className="text-[var(--text-secondary)] mt-2 text-lg">Track your progress and stay organized</p>
        </div>
        {auth.role === 'ADMIN' && (
          <Link href="/admin" className="btn-secondary">
            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Admin Panel
          </Link>
        )}
      </div>

      {tasks.length === 0 ? (
        <div className="card text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-6 glow">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-3">All caught up!</h3>
          <p className="text-[var(--text-secondary)] text-lg">You have no tasks assigned at the moment. Enjoy your free time!</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {tasks.map((t: any) => {
            const total = t.checklist.length || 1
            const done = t.checklist.filter((c: any) => !!c.doneAt).length
            const pct = Math.round((done / total) * 100)
            return (
              <div key={t.id} className="card group">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <Link href={`/tasks/${t.id}`} className="text-xl font-semibold text-primary-600 hover:text-primary-700 transition-colors group-hover:underline">
                        {t.title}
                      </Link>
                      <Badge t={t} />
                    </div>
                    <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">{t.description}</p>
                    <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)] flex-wrap">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        t.priority === 'HIGH' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        t.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {t.priority} PRIORITY
                      </span>
                      {t.deadline && (
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Due: {new Date(t.deadline).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-3xl font-bold text-gradient">{pct}%</div>
                    <div className="text-sm text-[var(--text-secondary)] mt-1">Complete</div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="w-full bg-gray-900/50 dark:bg-gray-900/50 rounded-full h-3 overflow-hidden border border-purple-500/20">
                    <div
                      className="bg-gradient-to-r from-violet-600 to-cyan-500 h-3 rounded-full transition-all duration-500 ease-out glow"
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
