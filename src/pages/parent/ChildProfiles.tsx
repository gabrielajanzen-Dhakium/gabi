import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockGoals } from '../../data/mock-goals'
import { formatCurrency, calculateAge, getInitials } from '../../lib/utils'
import { Plus, BookOpen, Target } from 'lucide-react'

export default function ChildProfiles() {
  const { children: childProfiles, switchToChild } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Children</h1>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand-dark transition-colors">
          <Plus size={16} /> Add Child
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {childProfiles.map(child => {
          const goals = mockGoals.filter(g => g.childId === child.id)
          const totalValue = goals.reduce((s, g) => s + g.currentValue, 0)
          return (
            <div key={child.id} className="bg-white rounded-2xl border border-border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand to-brand-600 text-white text-lg font-bold flex items-center justify-center">
                  {getInitials(child.name)}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-text-primary">{child.name}</h2>
                  <p className="text-sm text-text-muted">Age {calculateAge(child.dateOfBirth)} • {child.ageGroup}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-surface-secondary rounded-xl p-3">
                  <p className="text-xs text-text-muted">Portfolio Value</p>
                  <p className="text-lg font-bold text-text-primary">{formatCurrency(totalValue)}</p>
                </div>
                <div className="bg-surface-secondary rounded-xl p-3">
                  <p className="text-xs text-text-muted">Active Goals</p>
                  <p className="text-lg font-bold text-text-primary">{goals.length}</p>
                </div>
              </div>

              {/* Goals */}
              <div className="space-y-2 mb-5">
                {goals.map(g => {
                  const pct = (g.currentValue / g.targetAmount) * 100
                  return (
                    <div key={g.id} className="flex items-center gap-3">
                      <Target size={14} className="text-brand shrink-0" />
                      <span className="text-sm text-text-secondary flex-1 truncate">{g.goalName}</span>
                      <div className="w-20 h-2 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-brand rounded-full" style={{ width: `${Math.min(pct, 100)}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-text-primary tabular-nums w-10 text-right">{pct.toFixed(0)}%</span>
                    </div>
                  )
                })}
              </div>

              <div className="flex gap-2">
                <button onClick={() => { switchToChild(child.id); navigate('/learn') }} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-brand-light text-brand text-sm font-semibold rounded-xl hover:bg-brand/10 transition-colors">
                  <BookOpen size={16} /> View as Child
                </button>
                <Link to="/dashboard/goals/new" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-surface-secondary text-text-primary text-sm font-semibold rounded-xl hover:bg-surface-tertiary transition-colors">
                  <Plus size={16} /> New Goal
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
