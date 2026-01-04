import { headers } from 'next/headers'
import { getAuthUser } from '@/lib/auth'

export default async function AdminInsightsPage() {
  const auth = getAuthUser()
  if (!auth || auth.role !== 'ADMIN') return <main className="p-8">Forbidden</main>
  const h = headers()
  const host = h.get('x-forwarded-host') || h.get('host') || ''
  const protocol = (h.get('x-forwarded-proto') || 'http') + '://'
  const base = host ? `${protocol}${host}` : ''
  const res = await fetch(`${base}/api/insights`, { cache: 'no-store' })
  const data = res.ok ? await res.json() : { suggestions: [], counts: { overdue: 0, slow: 0 } }
  const suggestions: string[] = data.suggestions || []
  
  return (
    <main className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gradient">AI Insights</h1>
          <p className="text-[var(--text-secondary)] mt-2 text-lg">Smart recommendations to optimize your team's performance</p>
        </div>
      </div>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="stat-card hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-label">Overdue Tasks</div>
              <div className="stat-value text-red-500">{data.counts.overdue}</div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center glow">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="stat-card hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-label">Slow Progress Tasks</div>
              <div className="stat-value text-yellow-600">{data.counts.slow}</div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Actionable Recommendations
        </h2>
        {suggestions.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 glow">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Everything looks great!</h3>
            <p className="text-[var(--text-secondary)] text-lg">Your team is performing well. Keep up the good work!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-4 p-5 bg-[var(--bg-secondary)] rounded-xl border-l-4 border-violet-500 hover:bg-[var(--border)] transition-colors glow">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-full flex items-center justify-center glow">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-base leading-relaxed">{suggestion}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="card text-center hover:scale-105 transition-transform">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-full flex items-center justify-center mx-auto mb-4 glow">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Productivity Tip</h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Tasks with clear deadlines are 40% more likely to be completed on time.
          </p>
        </div>

        <div className="card text-center hover:scale-105 transition-transform">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Team Balance</h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Distributing tasks evenly across team members improves overall efficiency.
          </p>
        </div>

        <div className="card text-center hover:scale-105 transition-transform">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Communication</h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Regular check-ins and comments help identify blockers early.
          </p>
        </div>
      </section>
    </main>
  )
}
