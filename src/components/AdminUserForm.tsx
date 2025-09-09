'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminUserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    employeeId: '',
    role: 'EMPLOYEE',
    domain: '',
  })
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setMsg(null)
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    setBusy(false)
    if (res.ok) {
      setMsg('User created successfully!')
      setFormData({
        name: '',
        email: '',
        password: '',
        employeeId: '',
        role: 'EMPLOYEE',
        domain: '',
      })
      router.refresh()
    } else {
      const { error } = await res.json()
      setMsg(error || 'Failed to create user.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3 className="text-lg font-semibold mb-6">Create New User</h3>
      {msg && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${
          msg.includes('Failed') || msg.includes('error') ? 'bg-danger/10 text-danger' : 'bg-success/10 text-success'
        }`}>
          {msg}
        </div>
      )}
      <div className="space-y-4">
        <div>
          <label className="label">Full Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            className="input w-full"
            required
          />
        </div>
        <div>
          <label className="label">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="input w-full"
            required
          />
        </div>
        <div>
          <label className="label">Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="input w-full"
            required
          />
        </div>
        <div>
          <label className="label">Employee ID</label>
          <input
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="Enter employee ID"
            className="input w-full"
            required
          />
        </div>
        <div>
          <label className="label">Work Domain</label>
          <input
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            placeholder="e.g., Engineering, Marketing"
            className="input w-full"
          />
        </div>
        <div>
          <label className="label">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input w-full"
          >
            <option value="EMPLOYEE">Employee</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button type="submit" disabled={busy} className="btn-primary w-full">
          {busy ? 'Creating...' : 'Create User'}
        </button>
      </div>
    </form>
  )
}
