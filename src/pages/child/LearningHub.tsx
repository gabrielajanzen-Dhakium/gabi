import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search, Lock, CheckCircle, Play, Star, Zap,
  Flame, Trophy, BookOpen, GraduationCap, TrendingUp
} from 'lucide-react'
import { educationModules } from '../../data/education-content'
import { useEducationStore } from '../../store/educationStore'
import ConfettiCelebration from '../../components/common/ConfettiCelebration'
import BadgeAwardModal from '../../components/common/BadgeAwardModal'

const XP_LEVELS = [0, 100, 250, 500, 900, 1500, 2500, 4000, 6000, 10000]
function getLevel(xp: number) {
  let level = 1
  for (let i = 0; i < XP_LEVELS.length; i++) {
    if (xp >= XP_LEVELS[i]) level = i + 1
  }
  return Math.min(level, XP_LEVELS.length)
}
function getLevelProgress(xp: number) {
  const level = getLevel(xp)
  const current = XP_LEVELS[level - 1] ?? 0
  const next = XP_LEVELS[level] ?? XP_LEVELS[XP_LEVELS.length - 1]
  return { level, current, next, pct: next > current ? Math.round(((xp - current) / (next - current)) * 100) : 100 }
}

export default function LearningHub() {
  const [search, setSearch] = useState('')
  const [showBadgeModal, setShowBadgeModal] = useState(false)
  const {
    lessonProgress, moduleProgress, totalXP,
    currentStreak, earnedBadges, confettiTrigger,
    newBadges, dismissNewBadges
  } = useEducationStore()

  const { level, pct, next } = getLevelProgress(totalXP)

  function getModuleProgress(moduleId: number) {
    const mod = educationModules.find(m => m.id === moduleId)
    if (!mod) return 0
    const completed = mod.lessons.filter(l => !!lessonProgress[l.id]?.completedAt).length
    return Math.round((completed / mod.lessons.length) * 100)
  }

  function isModuleUnlocked(moduleId: number) {
    if (moduleId === 1) return true
    return getModuleProgress(moduleId - 1) >= 80
  }

  const filtered = educationModules.filter(m =>
    !search || m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.subtitle.toLowerCase().includes(search.toLowerCase())
  )

  const totalCompleted = Object.values(moduleProgress).filter(mp => mp.completedAt).length
  const totalStars = Object.values(lessonProgress).reduce((sum, lp) => sum + (lp.stars ?? 0), 0)

  return (
    <div className="space-y-6 animate-fade-in">
      <ConfettiCelebration trigger={confettiTrigger} type="standard" />
      {showBadgeModal && newBadges.length > 0 && (
        <BadgeAwardModal badges={newBadges} onClose={() => { setShowBadgeModal(false); dismissNewBadges() }} />
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Learning Hub</h1>
          <p className="text-sm text-text-muted mt-0.5">CFA-aligned financial education for young investors</p>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-xl border border-border px-3 py-2 w-full sm:w-64">
          <Search size={16} className="text-text-muted" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search modules..." className="bg-transparent text-sm outline-none w-full" />
        </div>
      </div>

      {/* Player Stats Bar */}
      <div className="bg-white rounded-2xl border border-border p-5">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-md">
              {level}
            </div>
            <div>
              <p className="text-xs text-text-muted font-semibold uppercase tracking-wide">Level {level}</p>
              <div className="w-32 h-2 bg-border rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-brand to-purple-500 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
              <p className="text-xs text-text-muted mt-0.5">{totalXP} / {next} XP</p>
            </div>
          </div>
          <div className="h-10 w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-5 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Flame size={18} className="text-danger" />
              <div>
                <p className="text-sm font-bold text-text-primary">{currentStreak}</p>
                <p className="text-xs text-text-muted">Day Streak</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Trophy size={18} className="text-warning" />
              <div>
                <p className="text-sm font-bold text-text-primary">{totalCompleted}/{educationModules.length}</p>
                <p className="text-xs text-text-muted">Modules</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Star size={18} className="text-warning fill-warning" />
              <div>
                <p className="text-sm font-bold text-text-primary">{totalStars}</p>
                <p className="text-xs text-text-muted">Stars</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <GraduationCap size={18} className="text-brand" />
              <div>
                <p className="text-sm font-bold text-text-primary">{earnedBadges.length}</p>
                <p className="text-xs text-text-muted">Badges</p>
              </div>
            </div>
          </div>
          <div className="ml-auto hidden sm:block">
            <Link to="/achievements" className="flex items-center gap-1.5 text-sm text-brand font-semibold hover:underline">
              <TrendingUp size={14} /> View Achievements
            </Link>
          </div>
        </div>
      </div>

      {/* Module Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map(m => {
          const prog = getModuleProgress(m.id)
          const unlocked = isModuleUnlocked(m.id)
          const completed = prog >= 100
          const completedLessons = m.lessons.filter(l => !!lessonProgress[l.id]?.completedAt).length
          const moduleStars = m.lessons.reduce((sum, l) => sum + (lessonProgress[l.id]?.stars ?? 0), 0)
          const maxStars = m.lessons.length * 3

          return (
            <div key={m.id} className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
              unlocked ? 'border-border hover:shadow-lg hover:-translate-y-0.5' : 'border-border/50 opacity-60'
            }`}>
              <div className={`h-2 bg-gradient-to-r ${m.color}`} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${
                      completed ? 'bg-success/10' : unlocked ? `bg-gradient-to-br ${m.color}` : 'bg-surface-secondary'
                    }`}>
                      {completed ? '✅' : m.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-text-primary">{m.title}</h3>
                      <p className="text-xs text-text-muted">{m.subtitle}</p>
                    </div>
                  </div>
                  {!unlocked && <Lock size={18} className="text-text-muted shrink-0" />}
                  {completed && moduleStars > 0 && (
                    <div className="flex gap-0.5">
                      {[1,2,3].map(s => (
                        <Star key={s} size={14} className={s <= Math.round(moduleStars / m.lessons.length) ? 'text-warning fill-warning' : 'text-border'} />
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-sm text-text-secondary mb-3 line-clamp-2">{m.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 bg-brand/10 text-brand text-xs font-semibold rounded-full flex items-center gap-1">
                    <GraduationCap size={10} /> CFA
                  </span>
                  <span className="text-xs text-text-muted">{m.lessons.length} lessons</span>
                  <span className="text-xs text-text-muted flex items-center gap-0.5">
                    <Zap size={10} className="text-warning" />
                    {m.lessons.reduce((s, l) => s + l.xpReward, 0)} XP
                  </span>
                </div>
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>{completedLessons}/{m.lessons.length} lessons</span>
                    <span className="font-semibold text-text-primary">{prog}%</span>
                  </div>
                  <div className="h-2 bg-surface-secondary rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${completed ? 'from-success to-emerald-400' : m.color}`} style={{ width: `${prog}%` }} />
                  </div>
                </div>
                {prog > 0 && (
                  <div className="flex items-center gap-0.5 mb-4">
                    <span className="text-xs text-text-muted mr-1">Stars:</span>
                    {[...Array(maxStars)].map((_, i) => (
                      <Star key={i} size={9} className={i < moduleStars ? 'text-warning fill-warning' : 'text-border'} />
                    ))}
                    <span className="text-xs text-text-muted ml-1">{moduleStars}/{maxStars}</span>
                  </div>
                )}
                {unlocked && (
                  <Link to={`/learn/module/${m.id}`} className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    completed ? 'bg-success/10 text-success hover:bg-success/20' :
                    prog > 0 ? 'bg-brand text-white hover:bg-brand-dark' :
                    'bg-brand/10 text-brand hover:bg-brand/20'
                  }`}>
                    {completed ? <><CheckCircle size={16} /> Review Module</> :
                     prog > 0 ? <><Play size={16} /> Continue</> :
                     <><BookOpen size={16} /> Start Module</>}
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
