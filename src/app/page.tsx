export default function Home() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold text-gradient mb-6 animate-fade-in">
            GRP Tasker
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-8 max-w-3xl mx-auto leading-relaxed">
            Your team's productivity companion. Streamline workflows, track progress, 
            and achieve goals together.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/login" className="btn-primary text-lg px-8 py-3">
              Get Started
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="card group hover:scale-105 transition-transform duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 glow">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Smart Task Management</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Organize tasks with priorities, deadlines, and progress tracking. Stay on top of what matters most.
            </p>
          </div>

          <div className="card group hover:scale-105 transition-transform duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 glow">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Work together seamlessly with real-time comments, notifications, and group-based assignments.
            </p>
          </div>

          <div className="card group hover:scale-105 transition-transform duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 glow">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Analytics & Insights</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Make data-driven decisions with comprehensive analytics and actionable insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
