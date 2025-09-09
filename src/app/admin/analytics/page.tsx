export default async function AdminAnalyticsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/analytics/summary`, { cache: 'no-store' })
  const data = res.ok ? await res.json() : { totals: { tasks: 0, groups: 0 }, byPriority: {}, byGroup: [], completion: [] }
  const byPriority = data.byPriority as Record<string, number>
  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>
      <section className="grid md:grid-cols-3 gap-4">
        <div className="border p-4 rounded"><div className="text-sm text-gray-500">Total Tasks</div><div className="text-2xl font-semibold">{data.totals.tasks}</div></div>
        <div className="border p-4 rounded"><div className="text-sm text-gray-500">Groups</div><div className="text-2xl font-semibold">{data.totals.groups}</div></div>
        <div className="border p-4 rounded">
          <div className="text-sm text-gray-500 mb-2">By Priority</div>
          <div className="space-y-1">
            {Object.keys(byPriority).length === 0 ? <div className="text-sm text-gray-500">No data</div> : Object.entries(byPriority).map(([k,v]) => (
              <div key={k}>
                <div className="flex justify-between text-sm"><span>{k}</span><span>{v}</span></div>
                <div className="h-2 bg-gray-200 rounded">
                  <div className="h-2 bg-blue-600 rounded" style={{ width: `${Math.min(100, v)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
