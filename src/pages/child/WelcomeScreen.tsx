import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockGoals } from '../../data/mock-goals'
import { mockProgress, mockBadges } from '../../data/mock-education'
import { formatCurrency } from '../../lib/utils'
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react'

export default function WelcomeScreen() {
  const { children: childProfiles, activeChildId } = useAuth()
  const child = childProfiles.find(c => c.id === activeChildId) ?? childProfiles[0]
  const goals = mockGoals.filter(g => g.childId === child.id)
  const progress = mockProgress.filter(p => p.childId === child.id)
  const completedLessons = progress.filter(p => p.completionPct === 100).length
  const totalLessons = 24
  const recentBadges = mockBadges.filter(b => b.earnedAt).slice(-3)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Hero */}
      <div className="bg-gradient-to-r from-brand to-brand-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <h1 className="text-3xl font-extrabold">Welcome back, {child.name.split(' ')[0]}! 🎉</h1>
          <p className="text-white/80 mt-2">Keep up the great work on your financial journey!</p>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold">🔥 12</p>
              <p className="text-xs text-white/70">Day Streak</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold">⭐ 2,450</p>
              <p className="text-xs text-white/70">Total XP</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold">📚 {completedLessons}/{totalLessons}</p>
              <p className="text-xs text-white/70">Lessons Done</p>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Learning */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Continue Learning</h2>
          <Link to="/learn/hub" className="text-sm text-brand font-medium hover:underline">View All →</Link>
        </div>
        <Link to="/learn/module/3" className="flex items-center gap-4 p-4 bg-brand-50 rounded-xl hover:bg-brand-100 transition-colors group">
          <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center text-white font-bold">3</div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-text-primary">Module 3: How the Economy Works</p>
            <p className="text-xs text-text-muted">Lesson 2: Business Cycles & Central Banks</p>
            <div className="mt-2 h-1.5 bg-brand-100 rounded-full overflow-hidden">
              <div className="h-full bg-brand rounded-full" style={{ width: '60%' }} />
            </div>
          </div>
          <ArrowRight className="text-brand opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
        </Link>
      </div>

      {/* Goals */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">My Goals</h2>
        <div className="space-y-3">
          {goals.map(g => {
            const pct = (g.currentValue / g.targetAmount) * 100
            const goalEmoji = g.goalType === 'education' ? '🎓' : g.goalType === 'first_car' ? '🚗' : '🎯'
            return (
              <div key={g.id} className="p-4 bg-surface-secondary rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg">{goalEmoji}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-text-primary">{g.goalName}</p>
                    <p className="text-xs text-text-muted">{formatCurrency(g.currentValue)} / {formatCurrency(g.targetAmount)}</p>
                  </div>
                  <span className="text-sm font-bold text-brand tabular-nums">{pct.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brand to-brand-500 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Badges */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Recent Achievements</h2>
          <Link to="/learn/achievements" className="text-sm text-brand font-medium hover:underline">View All →</Link>
        </div>
        <div className="flex gap-4">
          {recentBadges.map(b => (
            <div key={b.id} className="flex items-center gap-3 p-3 bg-warning-light rounded-xl flex-1">
              <span className="text-2xl">{b.icon}</span>
              <div>
                <p className="text-sm font-semibold text-text-primary">{b.name}</p>
                <p className="text-xs text-text-muted">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
