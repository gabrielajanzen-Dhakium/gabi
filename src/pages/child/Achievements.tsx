import { Link } from 'react-router-dom'
import { Award, TrendingUp, Flame, Star, Zap, Trophy, GraduationCap, Lock } from 'lucide-react'
import { badgeDefs, educationModules } from '../../data/education-content'
import { useEducationStore } from '../../store/educationStore'

const leaderboard = [
  { rank: 1, name: 'Fatima K.', xp: 4200, flag: '🇦🇪' },
  { rank: 2, name: 'Ahmed S.', xp: 3850, flag: '🇸🇦' },
  { rank: 3, name: 'Aisha A.', xp: 2450, flag: '🇦🇪' },
  { rank: 4, name: 'Omar R.', xp: 2100, flag: '🇶🇦' },
  { rank: 5, name: 'Layla M.', xp: 1800, flag: '🇸🇦' },
]

const tierColors: Record<string, string> = {
  bronze: 'from-amber-400 to-orange-500',
  silver: 'from-slate-300 to-slate-500',
  gold: 'from-yellow-300 to-amber-500',
  platinum: 'from-violet-400 to-purple-600',
}

export default function Achievements() {
  const {
    earnedBadges, totalXP, currentStreak, longestStreak,
    lessonProgress, moduleProgress
  } = useEducationStore()

  const earnedIds = new Set(earnedBadges.map(b => b.badgeId))
  const earned = badgeDefs.filter(b => earnedIds.has(b.id))
  const locked = badgeDefs.filter(b => !earnedIds.has(b.id))

  const totalStars = Object.values(lessonProgress).reduce((sum, lp) => sum + (lp.stars ?? 0), 0)
  const completedModules = Object.values(moduleProgress).filter(mp => mp.completedAt).length
  const completedLessons = Object.values(lessonProgress).filter(lp => lp.completedAt).length

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-text-primary">Achievements</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-border p-5 text-center">
          <Award className="text-warning mx-auto mb-2" size={28} />
          <p className="text-2xl font-bold text-text-primary">{earned.length}/{badgeDefs.length}</p>
          <p className="text-xs text-text-muted">Badges Earned</p>
        </div>
        <div className="bg-white rounded-2xl border border-border p-5 text-center">
          <Zap className="text-brand mx-auto mb-2" size={28} />
          <p className="text-2xl font-bold text-text-primary">{totalXP.toLocaleString()}</p>
          <p className="text-xs text-text-muted">Total XP</p>
        </div>
        <div className="bg-white rounded-2xl border border-border p-5 text-center">
          <Flame className="text-danger mx-auto mb-2" size={28} />
          <p className="text-2xl font-bold text-text-primary">{currentStreak}</p>
          <p className="text-xs text-text-muted">Current Streak</p>
          <p className="text-xs text-text-muted/60">Best: {longestStreak}</p>
        </div>
        <div className="bg-white rounded-2xl border border-border p-5 text-center">
          <Star className="text-warning fill-warning mx-auto mb-2" size={28} />
          <p className="text-2xl font-bold text-text-primary">{totalStars}</p>
          <p className="text-xs text-text-muted">Stars Earned</p>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-brand" /> Learning Progress
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-text-muted">Modules Completed</span>
              <span className="font-semibold">{completedModules}/{educationModules.length}</span>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-brand rounded-full" style={{ width: `${(completedModules / educationModules.length) * 100}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-text-muted">Lessons Completed</span>
              <span className="font-semibold">{completedLessons}/{educationModules.reduce((s, m) => s + m.lessons.length, 0)}</span>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-success rounded-full" style={{ width: `${(completedLessons / educationModules.reduce((s, m) => s + m.lessons.length, 0)) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Earned Badges */}
      {earned.length > 0 && (
        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Trophy size={18} className="text-warning" /> Earned Badges ({earned.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {earned.map(b => {
              const earnedDate = earnedBadges.find(eb => eb.badgeId === b.id)?.earnedAt
              return (
                <div key={b.id} className={`rounded-2xl p-4 text-center bg-gradient-to-br ${b.color} text-white shadow-md hover:shadow-lg transition-shadow`}>
                  <span className="text-3xl">{b.icon}</span>
                  <p className="text-sm font-bold mt-2">{b.name}</p>
                  <p className="text-xs opacity-80 mt-0.5">{b.description}</p>
                  <div className="mt-2 flex items-center justify-center gap-1">
                    <Zap size={10} />
                    <span className="text-xs font-semibold">+{b.xpReward} XP</span>
                  </div>
                  {earnedDate && <p className="text-xs opacity-60 mt-1">{earnedDate}</p>}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Locked Badges */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Lock size={18} className="text-text-muted" /> Locked Badges ({locked.length})
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {locked.map(b => (
            <div key={b.id} className="bg-surface-secondary rounded-2xl p-4 text-center opacity-60 grayscale hover:opacity-80 hover:grayscale-0 transition-all">
              <span className="text-3xl">{b.icon}</span>
              <p className="text-sm font-semibold text-text-primary mt-2">{b.name}</p>
              <p className="text-xs text-text-muted mt-0.5">{b.description}</p>
              <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${tierColors[b.tier] ?? 'from-gray-400 to-gray-500'}`}>
                {b.tier}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Leaderboard</h2>
        <div className="space-y-2">
          {leaderboard.map(l => (
            <div key={l.rank} className={`flex items-center gap-4 p-3 rounded-xl ${l.rank <= 3 ? 'bg-warning/5' : 'bg-surface-secondary'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                l.rank === 1 ? 'bg-warning text-white' :
                l.rank === 2 ? 'bg-slate-300 text-white' :
                l.rank === 3 ? 'bg-amber-600 text-white' :
                'bg-border text-text-muted'
              }`}>
                {l.rank}
              </span>
              <span className="text-base">{l.flag}</span>
              <span className={`text-sm font-semibold flex-1 ${l.name === 'Aisha A.' ? 'text-brand' : 'text-text-primary'}`}>
                {l.name} {l.name === 'Aisha A.' && '(You)'}
              </span>
              <span className="text-sm font-bold text-warning tabular-nums">{l.xp.toLocaleString()} XP</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
