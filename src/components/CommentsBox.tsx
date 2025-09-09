"use client"
import { useState } from 'react'
import { Send } from 'lucide-react'

type Comment = { id: number; text: string; createdAt: string; author?: { name?: string } }

export default function CommentsBox({ taskId, initial }: { taskId: number; initial: Comment[] }) {
  const [comments, setComments] = useState<Comment[]>(initial)
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)

  async function post() {
    if (!text.trim()) return
    setBusy(true)
    const res = await fetch(`/api/tasks/${taskId}/comments`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) })
    setBusy(false)
    if (!res.ok) return
    const c = await res.json()
    setComments(prev => [...prev, c])
    setText('')
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-4 overflow-y-auto pr-2">
        {comments.map(c => (
          <div key={c.id} className="bg-secondary/50 p-3 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">
              <span className="font-semibold text-foreground">{c.author?.name || 'User'}</span>
              {' · '}
              {new Date(c.createdAt).toLocaleString()}
            </div>
            <p className="text-sm">{c.text}</p>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No comments yet.</p>
        )}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          className="input flex-1"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && post()}
        />
        <button onClick={post} disabled={busy} className="btn-primary px-4">
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}
