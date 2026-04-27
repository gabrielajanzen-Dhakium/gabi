import { mockBadges } from '../../data/mock-education'
import { Award, TrendingUp, Flame } from 'lucide-react'

const leaderboard = [
  { rank: 1, name: 'Fatima K.', xp: 4200, flag: '🇦🇪' },
  { rank: 2, name: 'Ahmed S.', xp: 3850, flag: '🇸🇦' },
  { rank: 3, name: 'Aisha A.', xp: 2450, flag: '🇦🇪' },
  { rank: 4, name: 'Omar R.', xp: 2100, flag: '🇶🇦' },
  { rank: 5, name: 'Layla M.', xp: 1800, flag: '🇸🇦' },
]

export default function Achievements() {
  const earned = mockBadges.filter(b => b.earnedAt)
  const locked = mockBadges.filter(b => !b.earnedAt)

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-text-primary">Achievements</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-border p-5 text-center">
          <Award className="text-warning mx-auto mb-2" size={28} />
          <p className="text-2xl font-bold text-text-primary">{earned.length}/{mockBadges.length}</p>
          <p className="text-xs text-text-muted">Badges Earned</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-5 text-center">
          <TrendingUp className="text-brand mx-auto mb-2" size={28} />
          <p className="text-2xl font-bold text-text-primary">2,450</p>
          <p className="text-xs text-text-muted">Total XP</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-5 text-center">
          <Flame className="text-danger mx-auto mb-2" size={28} />
          <p className="text-2xl font-bold text-text-primary">12</p>
          <p className="text-xs text-text-muted">Day Streak</p>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Your Badges</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {earned.map(b => (
            <div key={b.id} className="bg-warning-light rounded-xl p-4 text-center hover:shadow-md transition-shadow">
              <span className="text-3xl">{b.icon}</span>
              <p className="text-sm font-semibold text-text-primary mt-2">{b.name}</p>
              <p className="text-xs text-text-muted mt-0.5">{b.description}</p>
            </div>
          ))}
          {locked.map(b => (
            <div key={b.id} className="bg-surface-secondary rounded-xl p-4 text-center opacity-50 grayscale">
              <span className="text-3xl">{b.icon}</span>
              <p className="text-sm font-semibold text-text-primary mt-2">{b.name}</p>
              <p className="text-xs text-text-muted mt-0.5">{b.requirement}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Leaderboard</h2>
        <div className="space-y-2">
          {leaderboard.map(l => (
            <div key={l.rank} className={`flex items-center gap-4 p-3 rounded-xl ${l.rank <= 3 ? 'bg-warning-light' : 'bg-surface-secondary'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                l.rank === 1 ? 'bg-warning text-white' : l.rank === 2 ? 'bg-surface-tertiary text-text-primary' : l.rank === 3 ? 'bg-[#CD7F32] text-white' : 'bg-border text-text-muted'
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
