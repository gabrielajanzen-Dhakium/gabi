import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Home, BookOpen, Award, LineChart, MessageCircle, ArrowLeft } from 'lucide-react'
import { mockBadges } from '../../data/mock-education'

const NAV = [
  { label: 'Home', href: '/learn', icon: Home },
  { label: 'Learning Hub', href: '/learn/hub', icon: BookOpen },
  { label: 'Achievements', href: '/learn/achievements', icon: Award },
  { label: 'Simulator', href: '/learn/simulator', icon: LineChart },
  { label: 'Chat with Dhaki', href: '/learn/chat', icon: MessageCircle },
]

export default function ChildLayout() {
  const { switchToParent, children: childProfiles, activeChildId } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const child = childProfiles.find(c => c.id === activeChildId) ?? childProfiles[0]
  const earnedBadges = mockBadges.filter(b => b.earnedAt).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex">
      {/* Sidebar — vibrant child variant */}
      <aside className="hidden lg:flex flex-col w-[260px] bg-white/80 backdrop-blur-sm border-r border-brand-100">
        {/* Header */}
        <div className="h-16 flex items-center justify-between border-b border-brand-100 px-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-brand to-brand-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-brand to-brand-700 bg-clip-text text-transparent">Dhakium</span>
          </div>
        </div>

        {/* XP Bar */}
        <div className="px-4 py-4 border-b border-brand-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-text-secondary">Level 5</span>
            <span className="text-xs font-semibold text-brand">2,450 XP</span>
          </div>
          <div className="h-2 bg-brand-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-brand to-brand-500 rounded-full transition-all duration-500" style={{ width: '65%' }} />
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-lg">🔥</span>
            <span className="text-sm font-semibold text-warning">12-day streak!</span>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV.map(item => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                    ? 'bg-gradient-to-r from-brand to-brand-600 text-white shadow-sm'
                    : 'text-text-secondary hover:bg-brand-50 hover:text-brand'
                  }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Badges Preview */}
        <div className="px-4 pb-3 border-t border-brand-100 pt-3">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Badges Earned</p>
          <div className="flex flex-wrap gap-1.5">
            {mockBadges.slice(0, 6).map(badge => (
              <span
                key={badge.id}
                className={`text-lg ${badge.earnedAt ? '' : 'grayscale opacity-40'}`}
                title={badge.name}
              >
                {badge.icon}
              </span>
            ))}
            {earnedBadges > 6 && (
              <span className="text-xs text-brand font-medium">+{earnedBadges - 6}</span>
            )}
          </div>
        </div>

        {/* Back to Parent */}
        <div className="border-t border-brand-100 p-3">
          <button
            onClick={() => { switchToParent(); navigate('/dashboard') }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-surface-secondary transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to Parent View</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Top Bar */}
        <header className="lg:hidden h-14 bg-white/80 backdrop-blur-sm border-b border-brand-100 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">D</span>
            </div>
            <span className="font-semibold text-text-primary">Hi, {child?.name.split(' ')[0]}! 👋</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-brand">🔥 12</span>
            <span className="text-sm font-semibold text-warning">⭐ 2,450</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>

        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border flex justify-around py-2 z-40">
          {NAV.map(item => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 text-xs font-medium transition-colors ${isActive ? 'text-brand' : 'text-text-muted'
                  }`}
              >
                <Icon size={20} />
                <span>{item.label.split(' ')[0]}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
