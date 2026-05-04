/**
 * BadgeAwardModal.tsx
 * Displays a modal when the user earns new badges.
 */
import { useEffect } from 'react'
import { X, Star } from 'lucide-react'
import { BadgeDef } from '../../data/education-content'

interface Props {
  badges: BadgeDef[]
  onClose: () => void
}

const tierColors: Record<string, string> = {
  bronze: 'from-amber-400 to-orange-500',
  silver: 'from-slate-300 to-slate-400',
  gold: 'from-yellow-300 to-amber-500',
  platinum: 'from-violet-400 to-purple-600',
}

export default function BadgeAwardModal({ badges, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  if (badges.length === 0) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🎉</div>
          <h2 className="text-xl font-bold text-text-primary">
            {badges.length === 1 ? 'New Badge Earned!' : `${badges.length} New Badges!`}
          </h2>
          <p className="text-sm text-text-muted mt-1">Keep up the amazing work!</p>
        </div>

        {/* Badges */}
        <div className="space-y-3 mb-6">
          {badges.map(badge => (
            <div
              key={badge.id}
              className={`flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r ${badge.color} text-white`}
            >
              <span className="text-3xl">{badge.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-base">{badge.name}</p>
                <p className="text-xs opacity-90">{badge.description}</p>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-75 uppercase font-semibold">{badge.tier}</p>
                <p className="font-bold text-sm">+{badge.xpReward} XP</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stars decoration */}
        <div className="flex justify-center gap-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="text-warning fill-warning" />
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-colors"
        >
          Awesome! Continue Learning
        </button>
      </div>
    </div>
  )
}
