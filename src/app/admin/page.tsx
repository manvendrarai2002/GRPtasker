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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Admin Dashboard</h1>
          <p className="text-[var(--text-secondary)] mt-2">Manage users, groups, and tasks</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/analytics" className="btn-secondary">
            Analytics
          </Link>
          <Link href="/admin/insights" className="btn-accent">
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
        <h2 className="text-2xl font-semibold mb-6">Groups</h2>
        <div className="grid gap-6">
          {groups.map((g: any) => (
            <div key={g.id} className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{g.name}</h3>
                  {g.domain && <p className="text-sm text-[var(--text-secondary)]">{g.domain}</p>}
                  <div className="flex items-center gap-4 mt-2 text-sm text-[var(--text-secondary)]">
                    <span>{g.users.length} members</span>
                    <span>{g.tasks.length} tasks</span>
                  </div>
                </div>
                <ManageGroupUsers group={g} />
              </div>
              {g.tasks.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Tasks</h4>
                  <div className="space-y-3">
                    {g.tasks.map((t: any) => (
                      <div key={t.id} className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded-lg">
                        <div className="flex-1">
                          <Link href={`/tasks/${t.id}`} className="font-medium text-primary-600 hover:text-primary-700">
                            {t.title}
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              t.priority === 'HIGH' ? 'bg-danger/10 text-danger' :
                              t.priority === 'MEDIUM' ? 'bg-warning/10 text-warning' :
                              'bg-info/10 text-info'
                            }`}>
                              {t.priority}
                            </span>
                            <span className="text-sm text-[var(--text-secondary)]">
                              {t.assignees.map((a: any) => a.name).join(', ') || 'Unassigned'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link href={`/tasks/${t.id}`} className="text-primary-600 hover:text-primary-700 text-sm font-medium">
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
        <h2 className="text-2xl font-semibold mb-6">Users</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((u: any) => (
            <div key={u.id} className="card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-sm">
                    {u.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold">{u.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{u.email}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  u.role === 'ADMIN' ? 'bg-secondary-100 text-secondary-700' : 'bg-primary-100 text-primary-700'
                }`}>
                  {u.role}
                </span>
                {u.domain && <span className="text-sm text-[var(--text-secondary)]">{u.domain}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
