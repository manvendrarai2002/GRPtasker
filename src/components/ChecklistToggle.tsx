"use client"
import { useState } from 'react'

type Item = { id: number; text: string; doneAt: string | null }

export default function ChecklistToggle({ taskId, items }: { taskId: number; items: Item[] }) {
  const [list, setList] = useState<Item[]>(items)
  async function toggle(item: Item) {
    const target = !item.doneAt
    const res = await fetch(`/api/tasks/${taskId}/checklist`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId: item.id, done: target })
    })
    if (!res.ok) return
    setList(prev => prev.map(i => i.id === item.id ? { ...i, doneAt: target ? new Date().toISOString() : null } : i))
  }
  return (
    <ul className="space-y-3">
      {list.map(i => (
        <li key={i.id}>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={!!i.doneAt}
              onChange={() => toggle(i)}
              className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className={`flex-1 ${i.doneAt ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
              {i.text}
            </span>
          </label>
        </li>
      ))}
      {list.length === 0 && (
        <p className="text-sm text-muted-foreground">No checklist items for this task.</p>
      )}
    </ul>
  )
}
