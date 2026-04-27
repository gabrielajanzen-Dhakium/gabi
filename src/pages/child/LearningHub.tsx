import { Link } from 'react-router-dom'
import { mockModules, mockProgress } from '../../data/mock-education'
import { useAuth } from '../../context/AuthContext'
import { Lock, CheckCircle2, Play, Search } from 'lucide-react'
import { useState } from 'react'

export default function LearningHub() {
  const { activeChildId, children: childProfiles } = useAuth()
  const child = childProfiles.find(c => c.id === activeChildId) ?? childProfiles[0]
  const progress = mockProgress.filter(p => p.childId === child.id)
  const [search, setSearch] = useState('')

  function getModuleProgress(moduleId: number) {
    const lessons = progress.filter(p => p.moduleId === moduleId)
    if (lessons.length === 0) return 0
    return lessons.reduce((s, l) => s + l.completionPct, 0) / 3 // 3 lessons per module
  }

  function isModuleUnlocked(moduleId: number) {
    if (moduleId === 1) return true
    return getModuleProgress(moduleId - 1) >= 80
  }

  const filtered = mockModules.filter(m =>
    !search || m.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-text-primary">Learning Hub</h1>
        <div className="flex items-center gap-2 bg-white rounded-xl border border-border px-3 py-2 w-full sm:w-64">
          <Search size={16} className="text-text-muted" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search modules..." className="bg-transparent text-sm outline-none w-full" id="learning-search" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5 stagger-children">
        {filtered.map(m => {
          const prog = getModuleProgress(m.id)
          const unlocked = isModuleUnlocked(m.id)
          const completed = prog >= 100

          return (
            <div key={m.id} className={`bg-white rounded-2xl border p-6 transition-all duration-300 ${
              unlocked ? 'border-border hover:shadow-lg hover:-translate-y-0.5 cursor-pointer' : 'border-border/50 opacity-60'
            }`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                    completed ? 'bg-success text-white' : unlocked ? 'bg-brand text-white' : 'bg-surface-tertiary text-text-muted'
                  }`}>
                    {completed ? <CheckCircle2 size={18} /> : m.id}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-text-primary">{m.title}</h3>
                    <p className="text-xs text-text-muted">Weeks {m.weeks} • {m.totalLessons} lessons</p>
                  </div>
                </div>
                {!unlocked && <Lock size={18} className="text-text-muted" />}
              </div>

              <p className="text-sm text-text-secondary mb-4 line-clamp-2">{m.description}</p>

              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-brand-light text-brand text-xs font-semibold rounded-full">CFA: {m.cfaWeight}</span>
                <span className="text-xs text-text-muted">{m.cfaEquivalent}</span>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-surface-tertiary rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-700 ${completed ? 'bg-success' : 'bg-brand'}`} style={{ width: `${prog}%` }} />
                </div>
                <span className="text-xs font-semibold text-text-primary tabular-nums">{Math.round(prog)}%</span>
              </div>

              {unlocked && (
                <Link to={`/learn/module/${m.id}`} className="flex items-center justify-center gap-2 w-full mt-4 py-2.5 bg-brand-light text-brand text-sm font-semibold rounded-xl hover:bg-brand/10 transition-colors">
                  <Play size={16} />
                  {prog > 0 && prog < 100 ? 'Continue' : prog >= 100 ? 'Review' : 'Start Module'}
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
