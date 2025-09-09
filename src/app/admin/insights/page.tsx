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
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Insights</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border p-4 rounded">
          <div className="text-sm text-gray-500 mb-2">Overview</div>
          <div className="space-y-2 text-sm">
            <div>Overdue tasks: <span className="font-medium">{data.counts.overdue}</span></div>
            <div>Slow tasks (&lt;50%): <span className="font-medium">{data.counts.slow}</span></div>
          </div>
        </div>
        <div className="border p-4 rounded">
          <div className="text-sm text-gray-500 mb-2">Suggestions</div>
          {suggestions.length === 0 ? (
            <div className="text-sm text-gray-500">No suggestions right now.</div>
          ) : (
            <ul className="list-disc pl-5 space-y-1">
              {suggestions.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          )}
        </div>
      </div>
    </main>
  )
}
