export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold text-gradient mb-6">
        Welcome to GRP Tasker
      </h1>
      <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
        The next-generation task and team management hub designed for modern teams.
        Streamline your workflow, boost productivity, and achieve your goals faster.
      </p>
      <div className="flex justify-center space-x-4">
        <a href="/login" className="btn-primary">
          Get Started
        </a>
        <a href="/dashboard" className="btn-secondary">
          View Dashboard
        </a>
      </div>
      <div className="mt-16 grid md:grid-cols-3 gap-8">
        <div className="card">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Task Management</h3>
          <p className="text-[var(--text-secondary)]">
            Organize and track tasks with priorities, deadlines, and progress monitoring.
          </p>
        </div>
        <div className="card">
          <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Team Collaboration</h3>
          <p className="text-[var(--text-secondary)]">
            Foster collaboration with comments, notifications, and group-based task assignment.
          </p>
        </div>
        <div className="card">
          <div className="text-lg font-semibold mb-2">Analytics & Insights</div>
          <p className="text-[var(--text-secondary)]">
            Gain valuable insights with comprehensive analytics and automated reporting.
          </p>
        </div>
      </div>
    </div>
  )
}
