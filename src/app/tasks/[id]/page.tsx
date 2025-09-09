import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'
import ChecklistToggle from '../../../components/ChecklistToggle'
import CommentsBox from '../../../components/CommentsBox'
import { Clock, Zap, MessageSquare, CheckSquare } from 'lucide-react'

export default async function TaskDetailPage({ params }: { params: { id: string } }) {
  const auth = getAuthUser()
  if (!auth) return <main className="p-8">Unauthorized</main>
  const id = Number(params.id)
  const task = await prisma.task.findFirst({
    where: {
      id,
      OR: [
        { assignees: { some: { id: auth.userId } } },
        { group: { users: { some: { id: auth.userId } } } },
        { group: null }
      ],
    },
    include: {
      checklist: { orderBy: { id: 'asc' } },
      comments: { orderBy: { createdAt: 'asc' }, include: { author: { select: { name: true } } } },
      assignees: { select: { name: true, id: true } },
      group: { select: { name: true, id: true } },
    },
  })
  if (!task) return <main className="p-8">Not found</main>
  const total = task.checklist.length || 0
  const done = task.checklist.filter((c: any) => !!c.doneAt).length
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <div className="card">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gradient">{task.title}</h1>
            <div className="flex items-center gap-4 mt-3 text-muted-foreground text-sm">
              <div className="flex items-center gap-1">
                <Zap size={14} className={
                  task.priority === 'HIGH' ? 'text-danger' :
                  task.priority === 'MEDIUM' ? 'text-warning' : 'text-info'
                } />
                <span>{task.priority} Priority</span>
              </div>
              {task.deadline && (
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>Due {new Date(task.deadline).toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold">{pct}%</div>
            <div className="text-sm text-muted-foreground">Complete</div>
          </div>
        </div>

        <p className="mt-6 text-foreground/90 whitespace-pre-wrap">{task.description}</p>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Assignees</h3>
          <div className="flex flex-wrap gap-2">
            {task.assignees.map(a => (
              <span key={a.id} className="px-2 py-1 bg-secondary-100 text-secondary-800 rounded-full text-xs">
                {a.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="card">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <CheckSquare size={20} className="text-primary" />
            Checklist
          </h2>
          <ChecklistToggle taskId={task.id} items={task.checklist as any} />
        </div>
        <div className="card">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <MessageSquare size={20} className="text-primary" />
            Comments
          </h2>
          <CommentsBox taskId={task.id} initial={task.comments as any} />
        </div>
      </section>
    </main>
  )
}
