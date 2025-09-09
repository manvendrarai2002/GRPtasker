"use client"
import { useEffect, useState } from 'react'
import { Bell, CheckCheck } from 'lucide-react'

type Notification = { id: number; type: string; message: string; createdAt: string; readAt?: string | null }

export default function NotificationsBell() {
  const [items, setItems] = useState<Notification[]>([])
  const [open, setOpen] = useState(false)

  async function load() {
    const res = await fetch('/api/notifications')
    if (!res.ok) return
    const data = await res.json()
    setItems(data)
  }

  useEffect(() => {
    load()
    const interval = setInterval(load, 5000) // Poll for new notifications
    return () => clearInterval(interval)
  }, [])

  async function markAllRead() {
    const ids = items.filter(i => !i.readAt).map(i => i.id)
    if (!ids.length) return
    await fetch('/api/notifications', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ids }) })
    load()
    setOpen(false)
  }

  const unread = items.filter(i => !i.readAt).length

  return (
    <div className="relative">
      <button className="relative btn-secondary p-2" onClick={() => setOpen(v => !v)}>
        <Bell size={20} />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-xs text-white">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-auto card p-0 z-50">
          <div className="p-3 flex justify-between items-center border-b border-[var(--border)]">
            <h4 className="font-semibold">Notifications</h4>
            {unread > 0 && (
              <button className="text-sm btn-secondary" onClick={markAllRead}>
                <CheckCheck size={16} className="mr-1 inline" />
                Mark all read
              </button>
            )}
          </div>
          <div className="p-1">
            {items.length === 0 ? (
              <div className="p-4 text-sm text-center text-muted-foreground">No notifications yet.</div>
            ) : (
              items.map(n => (
                <div
                  key={n.id}
                  className={`p-2 rounded-lg text-sm ${!n.readAt ? 'font-semibold bg-primary/5' : 'text-muted-foreground'}`}
                >
                  <div className="flex items-start gap-2">
                    <div className={`mt-1 h-2 w-2 rounded-full ${!n.readAt ? 'bg-primary' : 'bg-transparent'}`}></div>
                    <div className="flex-1">
                      <div>{n.message}</div>
                      <div className="text-xs font-normal text-muted-foreground/80">
                        {new Date(n.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
