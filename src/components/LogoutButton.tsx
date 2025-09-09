"use client"

export default function LogoutButton() {
  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/login'
  }
  return <button onClick={logout} className="text-sm text-gray-600 border rounded px-2 py-1">Logout</button>
}
