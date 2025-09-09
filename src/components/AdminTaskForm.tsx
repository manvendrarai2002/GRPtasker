"use client"
import { useEffect, useState } from 'react'

type User = { id: number; name: string }
type Group = { id: number; name: string }

type Props = { }

export default function AdminTaskForm(_: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<'HIGH'|'MEDIUM'|'LOW'>('MEDIUM')
  const [deadline, setDeadline] = useState('')
  const [assignees, setAssignees] = useState<number[]>([])
  const [groupId, setGroupId] = useState<number | ''>('')
  const [checklist, setChecklist] = useState<string[]>([''])
  const [users, setUsers] = useState<User[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const [u, g] = await Promise.all([
        fetch('/api/users').then(r => r.ok ? r.json() : []),
        fetch('/api/groups').then(r => r.ok ? r.json() : [])
      ])
      setUsers(u)
      setGroups(g)
    }
    load()
  }, [])

  function setChecklistItem(i: number, val: string) {
    setChecklist(prev => prev.map((x, idx) => idx === i ? val : x))
  }
  function addChecklistItem() { setChecklist(prev => [...prev, '']) }
  function removeChecklistItem(i: number) { setChecklist(prev => prev.filter((_, idx) => idx !== i)) }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setMsg(null)
    const payload = {
      title,
      description,
      priority,
      deadline: deadline ? new Date(deadline).toISOString() : undefined,
      assigneeIds: assignees,
      groupId: groupId === '' ? undefined : Number(groupId),
      checklist: checklist.filter(Boolean),
    }
    const res = await fetch('/api/tasks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setBusy(false)
    if (!res.ok) {
      setMsg('Failed to create task')
      return
    }
    setMsg('Task created')
    setTitle(''); setDescription(''); setPriority('MEDIUM'); setDeadline(''); setAssignees([]); setGroupId(''); setChecklist([''])
  }

  function toggleAssignee(id: number) {
    setAssignees(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <form onSubmit={submit} className="card">
      <h3 className="text-lg font-semibold mb-6">Create New Task</h3>
      {msg && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${
          msg.includes('Failed') ? 'bg-danger/10 text-danger' : 'bg-success/10 text-success'
        }`}>
          {msg}
        </div>
      )}
      <div className="space-y-4">
        <div>
          <label className="label">Title</label>
          <input
            className="input w-full"
            placeholder="Enter task title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label">Description</label>
          <textarea
            className="input w-full h-24 resize-none"
            placeholder="Describe the task"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="label">Priority</label>
            <select
              className="input w-full"
              value={priority}
              onChange={e => setPriority(e.target.value as any)}
            >
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>
          <div>
            <label className="label">Deadline</label>
            <input
              className="input w-full"
              type="datetime-local"
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Group</label>
            <select
              className="input w-full"
              value={groupId}
              onChange={e => setGroupId(e.target.value === '' ? '' : Number(e.target.value))}
            >
              <option value="">No group</option>
              {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="label">Assignees</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {users.map(u => (
              <label key={u.id} className="flex items-center gap-2 p-2 border border-[var(--border)] rounded-lg hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={assignees.includes(u.id)}
                  onChange={() => toggleAssignee(u.id)}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm">{u.name}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="label">Checklist Items</label>
          <div className="space-y-2 mt-2">
            {checklist.map((c, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  className="input flex-1"
                  placeholder="Checklist item"
                  value={c}
                  onChange={e => setChecklistItem(idx, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeChecklistItem(idx)}
                  className="btn-danger px-3 py-2"
                  disabled={checklist.length === 1}
                >
                  ×
                </button>
              </div>
            ))}
            <button type="button" onClick={addChecklistItem} className="btn-secondary w-full">
              + Add Item
            </button>
          </div>
        </div>
        <button type="submit" disabled={busy} className="btn-primary w-full">
          {busy ? 'Creating...' : 'Create Task'}
        </button>
      </div>
    </form>
  )
}
