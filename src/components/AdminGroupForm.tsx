"use client"
import { useEffect, useState } from 'react'

type User = { id: number; name: string; domain?: string }

export default function AdminGroupForm() {
  const [name, setName] = useState('')
  const [domain, setDomain] = useState('')
  const [selected, setSelected] = useState<number[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/users').then(r => r.ok ? r.json() : []).then(setUsers)
  }, [])

  function toggle(id: number) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setMsg(null)
    const body: any = { name }
    if (domain) body.domain = domain
    if (selected.length) body.userIds = selected
    const res = await fetch('/api/groups', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    setBusy(false)
    setMsg(res.ok ? 'Group created' : 'Failed to create group')
    if (res.ok) { setName(''); setDomain(''); setSelected([]) }
  }

  const uniqueDomains = Array.from(new Set(users.map(u => u.domain).filter(Boolean))) as string[]

  return (
    <form onSubmit={submit} className="card">
      <h3 className="text-lg font-semibold mb-6">Create New Group</h3>
      {msg && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${
          msg.includes('Failed') ? 'bg-danger/10 text-danger' : 'bg-success/10 text-success'
        }`}>
          {msg}
        </div>
      )}
      <div className="space-y-4">
        <div>
          <label className="label">Group Name</label>
          <input
            className="input w-full"
            placeholder="Enter group name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label">Domain</label>
          <div className="flex gap-2">
            <input
              className="input flex-1"
              placeholder="e.g., Engineering, Marketing"
              value={domain}
              onChange={e => setDomain(e.target.value)}
            />
            {uniqueDomains.length > 0 && (
              <select
                className="input"
                value={domain}
                onChange={e => setDomain(e.target.value)}
              >
                <option value="">Pick existing domain</option>
                {uniqueDomains.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            )}
          </div>
        </div>
        <div>
          <label className="label">Assign Users</label>
          <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto">
            {users.map(u => (
              <label key={u.id} className="flex items-center gap-2 p-2 border border-[var(--border)] rounded-lg hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.includes(u.id)}
                  onChange={() => toggle(u.id)}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm">{u.name}{u.domain ? ` · ${u.domain}` : ''}</span>
              </label>
            ))}
          </div>
        </div>
        <button type="submit" disabled={busy} className="btn-primary w-full">
          {busy ? 'Creating...' : 'Create Group'}
        </button>
      </div>
    </form>
  )
}
