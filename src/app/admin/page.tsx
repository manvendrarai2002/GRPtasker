import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'
import AdminTaskForm from '../../components/AdminTaskForm'
import AdminUserForm from '../../components/AdminUserForm'
import AdminGroupForm from '../../components/AdminGroupForm'
import ManageGroupUsers from '../../components/ManageGroupUsers'
import DeleteTaskButton from '../../components/DeleteTaskButton'
import Link from 'next/link'

export default async function AdminPage() {
  const auth = getAuthUser()
  if (!auth || auth.role !== 'ADMIN') return <main className="p-8">Forbidden</main>
  const groups = await prisma.group.findMany({ include: { users: true, tasks: { include: { assignees: true } } } })
  const users = await prisma.user.findMany({})

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gradient">Admin Dashboard</h1>
          <p className="text-[var(--text-secondary)] mt-2 text-lg">Manage users, groups, and tasks</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/analytics" className="btn-primary">
            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Analytics
          </Link>
          <Link href="/admin/insights" className="btn-accent">
            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Insights
          </Link>
        </div>
      </div>

      <section className="grid md:grid-cols-3 gap-6">
        <AdminTaskForm />
        <AdminGroupForm />
        <AdminUserForm />
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2">
          <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Groups
        </h2>
        <div className="grid gap-6">
          {groups.map((g: any) => (
            <div key={g.id} className="card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold">{g.name}</h3>
                  {g.domain && <p className="text-sm text-[var(--text-secondary)] mt-1">{g.domain}</p>}
                  <div className="flex items-center gap-6 mt-3 text-[var(--text-secondary)]">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      {g.users.length} members
                    </span>
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      {g.tasks.length} tasks
                    </span>
                  </div>
                </div>
                <ManageGroupUsers group={g} />
              </div>
              {g.tasks.length > 0 && (
                <div>
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    Tasks
                  </h4>
                  <div className="space-y-3">
                    {g.tasks.map((t: any) => (
                      <div key={t.id} className="flex items-center justify-between p-4 bg-[var(--bg-secondary)] rounded-xl hover:bg-[var(--border)] transition-colors">
                        <div className="flex-1 min-w-0">
                          <Link href={`/tasks/${t.id}`} className="font-semibold text-primary-600 hover:text-primary-700 hover:underline block truncate">
                            {t.title}
                          </Link>
                          <div className="flex items-center gap-3 mt-2 flex-wrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              t.priority === 'HIGH' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                              t.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                              'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            }`}>
                              {t.priority}
                            </span>
                            <span className="text-sm text-[var(--text-secondary)]">
                              {t.assignees.map((a: any) => a.name).join(', ') || 'Unassigned'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 ml-4">
                          <Link href={`/tasks/${t.id}`} className="text-primary-600 hover:text-primary-700 text-sm font-medium px-3 py-1.5 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors">
                            View
                          </Link>
                          <DeleteTaskButton taskId={t.id} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2">
          <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Users
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((u: any) => (
            <div key={u.id} className="card hover:scale-105 transition-transform">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-700 rounded-full flex items-center justify-center flex-shrink-0 glow">
                  <span className="text-white font-bold text-lg">
                    {u.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">{u.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)] truncate">{u.email}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                  u.role === 'ADMIN' 
                    ? 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400' 
                    : 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                }`}>
                  {u.role}
                </span>
                {u.domain && <span className="text-sm text-[var(--text-secondary)] truncate">{u.domain}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
