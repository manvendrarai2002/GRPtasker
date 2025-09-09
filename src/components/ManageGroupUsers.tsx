'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type User = {
  id: number
  name: string
  domain: string | null
}

type Group = {
  id: number
  name: string
  users: User[]
}

export default function ManageGroupUsers({ group }: { group: Group }) {
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>(group.users.map(u => u.id))
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      fetch('/api/users')
        .then(res => res.json())
        .then(data => setAllUsers(data))
    }
  }, [isOpen])

  const handleToggleUser = (userId: number) => {
    setSelectedUserIds(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch(`/api/groups/${group.id}/users`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userIds: selectedUserIds }),
    })
    setIsOpen(false)
    router.refresh()
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-secondary text-sm"
      >
        {isOpen ? 'Cancel' : 'Manage Users'}
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="card mt-4">
          <h4 className="text-lg font-semibold mb-4">Edit users for {group.name}</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
            {allUsers.map(user => (
              <label key={user.id} className="flex items-center gap-2 p-2 border border-[var(--border)] rounded-lg hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedUserIds.includes(user.id)}
                  onChange={() => handleToggleUser(user.id)}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm">{user.name}</span>
              </label>
            ))}
          </div>
          <button type="submit" className="btn-primary">
            Save Changes
          </button>
        </form>
      )}
    </div>
  )
}
