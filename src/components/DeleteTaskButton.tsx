'use client'

import { useRouter } from 'next/navigation'

export default function DeleteTaskButton({ taskId }: { taskId: number }) {
  const router = useRouter()

  async function handleDelete(e: React.FormEvent) {
    e.preventDefault()
    if (confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' })
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleDelete}>
      <button type="submit" className="btn-danger">
        Delete Task
      </button>
    </form>
  )
}
