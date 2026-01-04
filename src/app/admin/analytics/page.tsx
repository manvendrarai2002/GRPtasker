export default async function AdminAnalyticsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/analytics/summary`, { cache: 'no-store' })
  const data = res.ok ? await res.json() : { totals: { tasks: 0, groups: 0 }, byPriority: {}, byGroup: [], completion: [] }
  const byPriority = data.byPriority as Record<string, number>
  const maxTasks = Math.max(...Object.values(byPriority as any), 1)
  const totalByPriority = Object.values(byPriority as any).reduce((a: number, b: number) => a + b, 0) || 1

  const priorityColors: Record<string, string> = {
    HIGH: 'from-red-500 to-red-600',
    MEDIUM: 'from-yellow-500 to-yellow-600',
    LOW: 'from-blue-500 to-blue-600'
  }

  return (
    <main className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gradient">Analytics Dashboard</h1>
          <p className="text-[var(--text-secondary)] mt-2 text-lg">Comprehensive insights into your team's productivity</p>
        </div>
      </div>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="stat-card hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-label">Total Tasks</div>
              <div className="stat-value">{data.totals.tasks}</div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl flex items-center justify-center glow">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="stat-card hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-label">Active Groups</div>
              <div className="stat-value">{data.totals.groups}</div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-2xl flex items-center justify-center glow">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="stat-card hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-label">Average Completion</div>
              <div className="stat-value">
                {data.completion.length > 0 
                  ? Math.round(data.completion.reduce((acc: number, t: any) => acc + t.pct, 0) / data.completion.length)
                  : 0}%
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-2xl flex items-center justify-center glow">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            Tasks by Priority
          </h2>
          {Object.keys(byPriority).length === 0 ? (
            <div className="text-center py-12 text-[var(--text-secondary)]">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              No task data available
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(byPriority).sort((a, b) => (b[1] as number) - (a[1] as number)).map(([priority, count]) => {
                const percentage = Math.round((count / totalByPriority) * 100)
                return (
                  <div key={priority}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-lg">{priority}</span>
                      <span className="text-[var(--text-secondary)]">{count} tasks ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-900/50 rounded-full h-4 overflow-hidden border border-purple-500/20">
                      <div
                        className={`bg-gradient-to-r ${priorityColors[priority] || 'from-gray-500 to-gray-600'} h-4 rounded-full transition-all duration-700 ease-out glow`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="card">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Groups Overview
          </h2>
          {data.byGroup.length === 0 ? (
            <div className="text-center py-12 text-[var(--text-secondary)]">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              No groups available
            </div>
          ) : (
            <div className="space-y-4">
              {data.byGroup.sort((a: any, b: any) => b.taskCount - a.taskCount).map((g: any) => (
                <div key={g.id} className="p-4 bg-[var(--bg-secondary)] rounded-xl hover:bg-[var(--border)] transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-lg">{g.name}</span>
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm font-medium">
                      {g.taskCount} {g.taskCount === 1 ? 'task' : 'tasks'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="card">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Task Completion Status
        </h2>
        {data.completion.length === 0 ? (
          <div className="text-center py-12 text-[var(--text-secondary)]">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            No completion data available
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.completion.sort((a: any, b: any) => b.pct - a.pct).map((t: any) => (
              <div key={t.id} className="p-4 bg-[var(--bg-secondary)] rounded-xl hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-sm truncate flex-1">{t.title}</span>
                  <span className="text-lg font-bold text-gradient ml-2">{t.pct}%</span>
                </div>
                <div className="w-full bg-gray-900/50 dark:bg-gray-900/50 rounded-full h-2 overflow-hidden border border-purple-500/20">
                  <div
                    className="bg-gradient-to-r from-violet-600 to-cyan-500 h-2 rounded-full transition-all duration-500 glow"
                    style={{ width: `${t.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
